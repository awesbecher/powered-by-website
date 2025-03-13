
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { Resend } from "npm:resend@2.0.0";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL");
const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Enhanced debugging logs for environment variables and their availability
console.log("Environment check for calendly-webhook function:");
console.log(`- CALENDLY_API_KEY configured: ${!!CALENDLY_API_KEY}, ${CALENDLY_API_KEY ? "Valid format: " + (CALENDLY_API_KEY.startsWith("eyJ") ? "Yes" : "No") : "Missing"}`);
console.log(`- SLACK_WEBHOOK_URL configured: ${!!SLACK_WEBHOOK_URL}, ${SLACK_WEBHOOK_URL ? SLACK_WEBHOOK_URL.substring(0, 15) + "..." : "Missing"}`);
console.log(`- NOTIFICATION_EMAIL configured: ${!!NOTIFICATION_EMAIL}, ${NOTIFICATION_EMAIL || "Missing"}`);
console.log(`- RESEND_API_KEY configured: ${!!RESEND_API_KEY}, ${RESEND_API_KEY ? "Valid key present" : "Missing"}`);

let resend = null;
if (RESEND_API_KEY) {
  try {
    resend = new Resend(RESEND_API_KEY);
    console.log("Resend client initialized successfully");
  } catch (error) {
    console.error(`Failed to initialize Resend client: ${error.message}`, error.stack);
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Log full request details
  console.log(`Request method: ${req.method}`);
  console.log(`Request headers: ${JSON.stringify(Object.fromEntries(req.headers.entries()))}`);
  console.log(`Request URL: ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and log webhook event
    let payload;
    let rawBody = "";
    
    try {
      rawBody = await req.text();
      console.log(`Raw request body length: ${rawBody.length}`);
      console.log(`Raw request body (truncated): ${rawBody.substring(0, 500)}`);
      
      if (!rawBody || rawBody.trim() === "") {
        console.error("Empty request body received");
        return new Response(JSON.stringify({ error: "Empty request body" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
      
      try {
        payload = JSON.parse(rawBody);
      } catch (parseError) {
        console.error(`Error parsing JSON body: ${parseError.message}`);
        return new Response(JSON.stringify({ 
          error: "Invalid JSON payload",
          message: `Failed to parse JSON: ${parseError.message}`,
          raw_body: rawBody.substring(0, 200) // Include truncated raw body for debugging
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
    } catch (bodyError) {
      console.error(`Error reading request body: ${bodyError.message}`);
      return new Response(JSON.stringify({ 
        error: "Failed to read request body",
        message: bodyError.message 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    
    console.log(`Received Calendly webhook event type: ${payload?.event || "unknown"}`);
    console.log(`Event payload structure: ${JSON.stringify(Object.keys(payload || {}))}`);

    // Verify webhook signature if headers are provided
    const signature = req.headers.get("calendly-webhook-signature");
    if (signature && CALENDLY_API_KEY) {
      console.log(`Webhook signature provided: ${signature}`);
      // In a production environment, you would verify the signature here
      // This is a placeholder for future webhook signature verification
    }

    // Event validation - more lenient detection of meeting scheduled events
    const isCreationEvent = 
      payload?.event === "invitee.created" || 
      (payload?.payload?.event_type?.name && payload?.payload?.event_type?.name.includes("Meeting")) ||
      (payload?.payload?.event?.name && payload?.payload?.event?.name.includes("Meeting"));
    
    const isCancellationEvent = payload?.event === "invitee.canceled";
    
    // Process meeting creation events
    if (isCreationEvent) {
      const eventData = payload.payload;
      console.log(`Event payload keys: ${JSON.stringify(Object.keys(eventData || {}))}`);
      
      const inviteeInfo = eventData?.invitee;
      const eventInfo = eventData?.event_type || eventData?.event;
      const scheduledEvent = eventData?.scheduled_event || eventData;
      
      if (!inviteeInfo || !eventInfo) {
        console.error("Missing critical event data in payload");
        console.log("inviteeInfo:", inviteeInfo ? Object.keys(inviteeInfo) : null);
        console.log("eventInfo:", eventInfo ? Object.keys(eventInfo) : null);
        
        return new Response(JSON.stringify({ 
          success: false, 
          message: "Missing critical event data in webhook payload",
          payload_structure: Object.keys(payload || {})
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
      
      console.log(`Meeting scheduled by: ${inviteeInfo?.name || "Unknown"}`);
      console.log(`Email: ${inviteeInfo?.email || "Not provided"}`);
      console.log(`Event type: ${eventInfo?.name || "Unknown"}`);
      console.log(`Scheduled time: ${scheduledEvent?.start_time || "Not specified"}`);
      
      // Format date and time for notifications
      const formattedTime = scheduledEvent?.start_time ? 
        new Date(scheduledEvent.start_time).toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'long',
        }) : 'Time not specified';
      
      // Send notification to Slack
      if (SLACK_WEBHOOK_URL) {
        try {
          console.log(`Preparing to send Slack notification to webhook URL`);
          
          const slackMessage = {
            text: "New Calendly Meeting Scheduled",
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: "🗓️ New Meeting Scheduled",
                  emoji: true
                }
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: `*Name:*\n${inviteeInfo?.name || 'Not provided'}`
                  },
                  {
                    type: "mrkdwn",
                    text: `*Email:*\n${inviteeInfo?.email || 'Not provided'}`
                  }
                ]
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: `*Event Type:*\n${eventInfo?.name || 'Not specified'}`
                  },
                  {
                    type: "mrkdwn",
                    text: `*Time:*\n${formattedTime}`
                  }
                ]
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: `*Calendly Link:*\n<${scheduledEvent?.uri || '#'}|View in Calendly>`
                  }
                ]
              },
              {
                type: "divider"
              }
            ]
          };
          
          console.log(`Sending Slack message for meeting booking`);
          
          const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(slackMessage)
          });
          
          const slackResponseText = await slackResponse.text();
          console.log(`Slack API response status: ${slackResponse.status}`);
          console.log(`Slack API response: ${slackResponseText}`);
          
          if (!slackResponse.ok) {
            console.error(`Failed to send Slack notification: ${slackResponseText}`);
          } else {
            console.log("Slack notification sent successfully");
          }
        } catch (slackError) {
          console.error(`Error sending Slack notification: ${slackError.message}`, slackError.stack);
        }
      } else {
        console.log("Slack webhook URL not configured, skipping notification");
      }
      
      // Send notification via email
      if (resend && NOTIFICATION_EMAIL) {
        try {
          console.log(`Preparing to send email notification to: ${NOTIFICATION_EMAIL}`);
          
          const emailResult = await resend.emails.send({
            from: "Lovable AI <onboarding@resend.dev>",
            to: NOTIFICATION_EMAIL,
            subject: "New Calendly Meeting Scheduled",
            html: `
              <h1>🗓️ New Meeting Scheduled</h1>
              <div style="padding: 20px; border-radius: 5px; border: 1px solid #e0e0e0; margin: 20px 0;">
                <h2>Meeting Details</h2>
                <p><strong>Name:</strong> ${inviteeInfo?.name || 'Not provided'}</p>
                <p><strong>Email:</strong> ${inviteeInfo?.email || 'Not provided'}</p>
                <p><strong>Event Type:</strong> ${eventInfo?.name || 'Not specified'}</p>
                <p><strong>Time:</strong> ${formattedTime}</p>
                <p><strong>Calendly Link:</strong> <a href="${scheduledEvent?.uri || '#'}">View in Calendly</a></p>
              </div>
            `,
          });
          
          console.log(`Email notification result: ${JSON.stringify(emailResult)}`);
        } catch (emailError) {
          console.error(`Error sending email notification: ${emailError.message}`, emailError.stack);
        }
      } else {
        console.log("Email notification skipped: Missing Resend API key or notification email");
        console.log(`- Resend initialized: ${!!resend}`);
        console.log(`- NOTIFICATION_EMAIL value: ${NOTIFICATION_EMAIL}`);
      }
    } else if (isCancellationEvent) {
      console.log("Meeting cancellation detected, processing...");
      // Process cancellation event - similar to above but for cancellations
      // Simplified here for brevity
    } else {
      console.log(`Ignoring non-meeting event: ${payload?.event || "unknown event type"}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(`Error handling Calendly webhook: ${error.message}`, error.stack);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);

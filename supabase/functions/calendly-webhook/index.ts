
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { Resend } from "npm:resend@2.0.0";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL");
const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Enhanced debugging logs for environment variables
console.log("Environment check:");
console.log("- SLACK_WEBHOOK_URL configured:", !!SLACK_WEBHOOK_URL);
console.log("- NOTIFICATION_EMAIL configured:", !!NOTIFICATION_EMAIL);
console.log("- RESEND_API_KEY configured:", !!RESEND_API_KEY);

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const handler = async (req: Request): Promise<Response> => {
  // Log full request details
  console.log("Request method:", req.method);
  console.log("Request headers:", Object.fromEntries(req.headers.entries()));
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log webhook event
    const payload = await req.json();
    console.log("Received Calendly webhook event:", JSON.stringify(payload));

    // Event validation - more lenient detection of meeting scheduled events
    if (
      payload?.event === "invitee.created" || 
      payload?.payload?.event_type?.name?.includes("Meeting") ||
      payload?.payload?.event?.name?.includes("Meeting")
    ) {
      const eventData = payload.payload;
      console.log("Event payload:", JSON.stringify(eventData));
      
      const inviteeInfo = eventData?.invitee;
      const eventInfo = eventData?.event_type || eventData?.event;
      const scheduledEvent = eventData?.scheduled_event || eventData;
      
      console.log("Meeting scheduled by:", inviteeInfo?.name);
      console.log("Email:", inviteeInfo?.email);
      console.log("Event type:", eventInfo?.name);
      console.log("Scheduled time:", scheduledEvent?.start_time);
      
      // Format date and time for notifications
      const formattedTime = scheduledEvent?.start_time ? 
        new Date(scheduledEvent.start_time).toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'long',
        }) : 'Time not specified';
      
      // Send notification to Slack
      if (SLACK_WEBHOOK_URL) {
        try {
          console.log("Preparing to send Slack notification to:", SLACK_WEBHOOK_URL);
          
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
          
          console.log("Sending Slack message:", JSON.stringify(slackMessage));
          
          const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(slackMessage)
          });
          
          const slackResponseText = await slackResponse.text();
          console.log("Slack API response status:", slackResponse.status);
          console.log("Slack API response:", slackResponseText);
          
          if (!slackResponse.ok) {
            console.error("Failed to send Slack notification:", slackResponseText);
          } else {
            console.log("Slack notification sent successfully");
          }
        } catch (slackError) {
          console.error("Error sending Slack notification:", slackError);
        }
      } else {
        console.log("Slack webhook URL not configured, skipping notification");
      }
      
      // Send notification via email
      if (resend && NOTIFICATION_EMAIL) {
        try {
          console.log("Preparing to send email notification to:", NOTIFICATION_EMAIL);
          
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
          
          console.log("Email notification result:", JSON.stringify(emailResult));
        } catch (emailError) {
          console.error("Error sending email notification:", emailError.message, emailError.stack);
        }
      } else {
        console.log("Email notification skipped: Missing Resend API key or notification email");
        console.log("- Resend initialized:", !!resend);
        console.log("- NOTIFICATION_EMAIL value:", NOTIFICATION_EMAIL);
      }
    } else {
      console.log("Ignoring non-meeting event:", payload?.event);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error handling Calendly webhook:", error.message, error.stack);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { Resend } from "npm:resend@2.0.0";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL");
const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log webhook event
    const payload = await req.json();
    console.log("Received Calendly webhook event:", payload);

    // Event validation - check if this is an invitee.created event
    if (
      payload?.event === "invitee.created" || 
      payload?.payload?.event_type?.name === "Meeting scheduled"
    ) {
      const eventData = payload.payload;
      const inviteeInfo = eventData?.invitee;
      const eventInfo = eventData?.event_type;
      const scheduledEvent = eventData?.scheduled_event;
      
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
          
          const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(slackMessage)
          });
          
          if (!slackResponse.ok) {
            const slackError = await slackResponse.text();
            console.error("Failed to send Slack notification:", slackError);
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
          
          console.log("Email notification sent successfully:", emailResult);
        } catch (emailError) {
          console.error("Error sending email notification:", emailError);
        }
      } else {
        console.log("Email notification skipped: Missing Resend API key or notification email");
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error handling Calendly webhook:", error);
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

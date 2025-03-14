
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend for email sending
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
const SALES_EMAIL = Deno.env.get("SALES_EMAIL");

// Main handler function
const handler = async (req: Request): Promise<Response> => {
  // Log request details
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the webhook payload
    const payload = await req.json();
    console.log("Received webhook payload:", JSON.stringify(payload).substring(0, 500) + "...");
    
    // Check if this is an invitee.created event (new meeting scheduled)
    if (payload.event === "invitee.created") {
      const eventData = payload.payload;
      
      // Extract relevant meeting information
      const {
        name = "Not provided",
        email = "Not provided",
        text_reminder_number = "Not provided"
      } = eventData.invitee || {};
      
      const {
        start_time,
        end_time,
        location = { location: "Virtual" },
        cancellation_url
      } = eventData.scheduled_event || {};
      
      const eventName = eventData.event_type?.name || "Meeting";
      const eventDate = start_time ? new Date(start_time).toLocaleString() : "Not specified";
      const eventEndDate = end_time ? new Date(end_time).toLocaleString() : "Not specified";
      const eventLocation = typeof location === 'string' ? location : (location?.location || "Virtual");
      
      // Additional event details for the email
      const eventDuration = eventData.scheduled_event?.duration_minutes 
        ? `${eventData.scheduled_event.duration_minutes} minutes` 
        : "Duration not specified";
      
      let questionsResponses = "No questions answered";
      if (eventData.questions_and_responses && Object.keys(eventData.questions_and_responses).length > 0) {
        questionsResponses = Object.entries(eventData.questions_and_responses)
          .map(([question, response]) => `<p><strong>${question}:</strong> ${response}</p>`)
          .join('');
      }
      
      // Send email notification to admin and sales team
      if (ADMIN_EMAIL && SALES_EMAIL) {
        const emailResponse = await resend.emails.send({
          from: "Calendly Notifications <onboarding@resend.dev>",
          to: [ADMIN_EMAIL, SALES_EMAIL],
          subject: `New Meeting Scheduled: ${name} - ${eventName}`,
          html: `
            <h2>New Meeting Scheduled via Calendly</h2>
            <p><strong>Meeting Type:</strong> ${eventName}</p>
            <p><strong>Contact:</strong> ${name} (${email})</p>
            <p><strong>Phone:</strong> ${text_reminder_number || "Not provided"}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>End Time:</strong> ${eventEndDate}</p>
            <p><strong>Duration:</strong> ${eventDuration}</p>
            <p><strong>Location:</strong> ${eventLocation}</p>
            
            <h3>Questions & Responses:</h3>
            ${questionsResponses}
            
            <p><a href="${cancellation_url}">Cancellation Link</a></p>
          `,
        });
        
        console.log("Email notification sent:", emailResponse);
      } else {
        console.error("Email notification failed: ADMIN_EMAIL or SALES_EMAIL not configured");
      }
    } else if (payload.event === "invitee.canceled") {
      // Handle cancellation events if needed
      const eventData = payload.payload;
      const { name = "Someone", email = "Not provided" } = eventData.invitee || {};
      const eventName = eventData.event_type?.name || "Meeting";
      
      // Send cancellation notification
      if (ADMIN_EMAIL && SALES_EMAIL) {
        await resend.emails.send({
          from: "Calendly Notifications <onboarding@resend.dev>",
          to: [ADMIN_EMAIL, SALES_EMAIL],
          subject: `Meeting Canceled: ${name} - ${eventName}`,
          html: `
            <h2>Meeting Cancellation Notice</h2>
            <p><strong>Meeting Type:</strong> ${eventName}</p>
            <p><strong>Contact:</strong> ${name} (${email})</p>
            <p><strong>Status:</strong> CANCELED</p>
          `,
        });
      }
    }
    
    // Return success response to Calendly
    return new Response(JSON.stringify({ 
      success: true,
      message: "Webhook processed successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error(`Error in webhook handler: ${error.message}`, error.stack);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: "webhook_processing_error",
        message: `Error processing webhook: ${error.message}`
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Always return 200 to avoid webhook retries
      }
    );
  }
};

serve(handler);

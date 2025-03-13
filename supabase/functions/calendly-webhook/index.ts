
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");

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
      
      console.log("Meeting scheduled by:", inviteeInfo?.name);
      console.log("Email:", inviteeInfo?.email);
      console.log("Event type:", eventInfo?.name);
      console.log("Scheduled time:", eventData?.scheduled_event?.start_time);
      
      // Here you would add code to send notifications
      // We'll implement this once we have Slack webhook URL and email info
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

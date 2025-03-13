
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get user organization
    const orgResponse = await fetch("https://api.calendly.com/users/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      }
    });

    if (!orgResponse.ok) {
      throw new Error(`Failed to fetch user information: ${orgResponse.status}`);
    }

    const userData = await orgResponse.json();
    const currentUser = userData.resource;
    const organizationUri = currentUser.current_organization;
    
    console.log("User organization:", organizationUri);

    // Create webhook subscription
    const webhookUrl = `${SUPABASE_URL}/functions/v1/calendly-webhook`;
    
    const webhookResponse = await fetch("https://api.calendly.com/webhook_subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      },
      body: JSON.stringify({
        url: webhookUrl,
        events: ["invitee.created"],
        organization: organizationUri,
        scope: "organization"
      })
    });

    const webhookData = await webhookResponse.json();
    
    if (!webhookResponse.ok) {
      console.error("Webhook creation failed:", webhookData);
      throw new Error(`Failed to create webhook: ${webhookResponse.status} - ${JSON.stringify(webhookData)}`);
    }

    console.log("Webhook created successfully:", webhookData);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Calendly webhook subscription created successfully",
      data: webhookData
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error setting up Calendly webhook:", error);
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


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
const CALENDLY_USER = Deno.env.get("CALENDLY_USER") || "https://api.calendly.com/users/me";
const BASE_URL = Deno.env.get("SUPABASE_URL");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!CALENDLY_API_KEY) {
      throw new Error("CALENDLY_API_KEY env variable not found");
    }

    // Get user organization
    const userResponse = await fetch(CALENDLY_USER, {
      headers: {
        Authorization: `Bearer ${CALENDLY_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    
    if (!userResponse.ok) {
      const error = await userResponse.json();
      throw new Error(`Failed to fetch user information: ${JSON.stringify(error)}`);
    }
    
    const userData = await userResponse.json();
    console.log("User data:", userData);
    
    const organizationUri = userData.resource.current_organization;
    console.log("User organization:", organizationUri);
    
    if (!organizationUri) {
      throw new Error("Organization URI not found in user data");
    }

    // Webhook endpoint URL (the URL of our calendly-webhook function)
    const webhookUrl = `${BASE_URL}/functions/v1/calendly-webhook`;
    
    // Create webhook subscription
    const response = await fetch("https://api.calendly.com/webhook_subscriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CALENDLY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: webhookUrl,
        organization: organizationUri,
        scope: "organization",
        events: [
          "invitee.created",
          "invitee.canceled"
        ]
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`Failed to create webhook subscription: ${JSON.stringify(result)}`);
    }

    console.log("Webhook subscription created successfully:", result);

    return new Response(JSON.stringify({
      success: true,
      message: "Webhook subscription created successfully",
      subscription: result
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Error creating webhook subscription:", error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});

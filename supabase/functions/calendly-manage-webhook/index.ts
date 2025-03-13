
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

// Enhanced debugging logs for environment variables
console.log("Environment check:");
console.log("- CALENDLY_API_KEY configured:", !!CALENDLY_API_KEY);
console.log("- SUPABASE_URL configured:", !!SUPABASE_URL);

const handler = async (req: Request): Promise<Response> => {
  // Log request details
  console.log("Request method:", req.method);
  console.log("Request headers:", Object.fromEntries(req.headers.entries()));
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Attempting to fetch user organization with API key");
    
    // Get user organization
    const orgResponse = await fetch("https://api.calendly.com/users/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      }
    });

    const orgResponseText = await orgResponse.text();
    console.log("Organization API response status:", orgResponse.status);
    console.log("Organization API response:", orgResponseText);

    if (!orgResponse.ok) {
      throw new Error(`Failed to fetch user information: ${orgResponse.status} - ${orgResponseText}`);
    }

    const userData = JSON.parse(orgResponseText);
    const currentUser = userData.resource;
    const organizationUri = currentUser.current_organization;
    
    console.log("User organization:", organizationUri);

    // Create webhook subscription
    const webhookUrl = `${SUPABASE_URL}/functions/v1/calendly-webhook`;
    console.log("Creating webhook subscription to URL:", webhookUrl);
    
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

    const webhookResponseText = await webhookResponse.text();
    console.log("Webhook API response status:", webhookResponse.status);
    console.log("Webhook API response:", webhookResponseText);
    
    const webhookData = JSON.parse(webhookResponseText);
    
    if (!webhookResponse.ok) {
      console.error("Webhook creation failed:", webhookData);
      throw new Error(`Failed to create webhook: ${webhookResponse.status} - ${JSON.stringify(webhookData)}`);
    }

    console.log("Webhook created successfully:", JSON.stringify(webhookData));

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Calendly webhook subscription created successfully",
      data: webhookData
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error setting up Calendly webhook:", error.message, error.stack);
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


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

// Enhanced debugging logs for environment variables
console.log("Environment check for calendly-manage-webhook function:");
console.log("- CALENDLY_API_KEY configured:", !!CALENDLY_API_KEY, CALENDLY_API_KEY ? "Valid key present" : "Missing");
console.log("- SUPABASE_URL configured:", !!SUPABASE_URL, SUPABASE_URL || "");

const handler = async (req: Request): Promise<Response> => {
  // Log request details
  console.log("Request method:", req.method);
  console.log("Request headers:", Object.fromEntries(req.headers.entries()));
  console.log("Request URL:", req.url);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!CALENDLY_API_KEY) {
      throw new Error("CALENDLY_API_KEY environment variable is not configured");
    }
    
    if (!SUPABASE_URL) {
      throw new Error("SUPABASE_URL environment variable is not configured");
    }
    
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

    // Generate the webhook URL
    const webhookUrl = `${SUPABASE_URL}/functions/v1/calendly-webhook`;
    console.log("Creating webhook subscription to URL:", webhookUrl);
    
    // Get existing webhooks first to avoid duplicates
    const existingWebhooksResponse = await fetch("https://api.calendly.com/webhook_subscriptions", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      }
    });
    
    const existingWebhooksText = await existingWebhooksResponse.text();
    console.log("Existing webhooks API response status:", existingWebhooksResponse.status);
    
    if (!existingWebhooksResponse.ok) {
      console.error("Failed to fetch existing webhooks:", existingWebhooksText);
    } else {
      const existingWebhooksData = JSON.parse(existingWebhooksText);
      console.log("Existing webhooks:", JSON.stringify(existingWebhooksData));
      
      // Check if a webhook with the same URL already exists
      const existingWebhook = existingWebhooksData.collection.find(
        (webhook: any) => webhook.attributes.url === webhookUrl
      );
      
      if (existingWebhook) {
        console.log("Webhook already exists:", JSON.stringify(existingWebhook));
        return new Response(JSON.stringify({ 
          success: true, 
          message: "Calendly webhook subscription already exists",
          data: existingWebhook
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }
    
    // Create webhook subscription
    const webhookResponse = await fetch("https://api.calendly.com/webhook_subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      },
      body: JSON.stringify({
        url: webhookUrl,
        events: ["invitee.created", "invitee.canceled"],
        organization: organizationUri,
        scope: "organization"
      })
    });

    const webhookResponseText = await webhookResponse.text();
    console.log("Webhook API response status:", webhookResponse.status);
    console.log("Webhook API response:", webhookResponseText);
    
    if (!webhookResponse.ok) {
      try {
        const webhookData = JSON.parse(webhookResponseText);
        console.error("Webhook creation failed:", webhookData);
        throw new Error(`Failed to create webhook: ${webhookResponse.status} - ${JSON.stringify(webhookData)}`);
      } catch (e) {
        throw new Error(`Failed to create webhook: ${webhookResponse.status} - ${webhookResponseText}`);
      }
    }

    const webhookData = JSON.parse(webhookResponseText);
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


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createResponse } from "./response-utils.ts";
import { CalendlyApiClient } from "./calendly-api-client.ts";

// Main handler function
const handler = async (req: Request): Promise<Response> => {
  // Log request details
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200
    });
  }

  try {
    // Get the Calendly API key from environment variables
    const apiKey = Deno.env.get("CALENDLY_API_KEY");
    if (!apiKey) {
      return createResponse({ 
        success: false, 
        error: "missing_api_key", 
        message: "Calendly API key is not configured"
      });
    }

    // Get the base URL for the webhook endpoint
    const baseUrl = Deno.env.get("SUPABASE_URL");
    if (!baseUrl) {
      return createResponse({ 
        success: false, 
        error: "missing_base_url", 
        message: "Supabase URL is not configured"
      });
    }

    // Initialize the Calendly API client
    const calendlyClient = new CalendlyApiClient(apiKey, true);

    // First, fetch the user organization
    console.log("Fetching user organization...");
    const orgResult = await calendlyClient.fetchUserOrganization();
    
    if (orgResult.error) {
      return createResponse({ 
        success: false, 
        error: orgResult.error.code, 
        message: orgResult.error.message,
        details: orgResult.error.details
      });
    }

    // Webhook endpoint URL (the URL of our calendly-webhook function)
    const webhookUrl = `${baseUrl}/functions/v1/calendly-webhook`;
    
    // Check for existing webhooks
    console.log("Checking for existing webhooks...");
    const existingWebhooksResult = await calendlyClient.checkExistingWebhooks(webhookUrl);
    
    if (existingWebhooksResult.error) {
      return createResponse({ 
        success: false, 
        error: existingWebhooksResult.error.code, 
        message: existingWebhooksResult.error.message,
        details: existingWebhooksResult.error.details
      });
    }

    // If webhook already exists, return success
    if (existingWebhooksResult.existingWebhook) {
      return createResponse({ 
        success: true, 
        message: "Webhook already exists",
        data: existingWebhooksResult.existingWebhook
      });
    }

    // Create a new webhook
    console.log("Creating new webhook...");
    const webhookResult = await calendlyClient.createWebhookSubscription(
      orgResult.organizationUri,
      webhookUrl
    );
    
    if (webhookResult.error) {
      return createResponse({ 
        success: false, 
        error: webhookResult.error.code, 
        message: webhookResult.error.message,
        details: webhookResult.error.details
      });
    }

    // Return success response
    return createResponse({ 
      success: true, 
      message: "Calendly webhook configured successfully",
      data: webhookResult.webhookData
    });
  } catch (error: any) {
    console.error(`Error in webhook handler: ${error.message}`, error.stack);
    // Always return 200 status with error in body to prevent the non-2xx error
    return createResponse({ 
      success: false, 
      error: "webhook_setup_error", 
      message: `Webhook setup error: ${error.message}`,
    });
  }
};

serve(handler);

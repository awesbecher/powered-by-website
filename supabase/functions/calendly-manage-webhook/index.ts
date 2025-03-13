
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { CalendlyApiClient } from "./calendly-api-client.ts";
import { createResponse, createErrorResponse } from "./response-utils.ts";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

// Enhanced debugging logs for environment variables
console.log("Environment check for calendly-manage-webhook function:");
console.log(`- CALENDLY_API_KEY configured: ${!!CALENDLY_API_KEY}, ${CALENDLY_API_KEY ? "Length: " + CALENDLY_API_KEY.length : "MISSING - THIS IS REQUIRED"}`);
console.log(`- SUPABASE_URL configured: ${!!SUPABASE_URL}, ${SUPABASE_URL || "MISSING - THIS IS REQUIRED"}`);

// Validate environment variables
function validateEnvironment(debugMode = false) {
  if (!CALENDLY_API_KEY) {
    console.error("CALENDLY_API_KEY environment variable is not configured");
    return createErrorResponse(
      "missing_api_key", 
      "Calendly API key is not configured. Please check your Supabase environment variables."
    );
  }
  
  if (!SUPABASE_URL) {
    console.error("SUPABASE_URL environment variable is not configured");
    return createErrorResponse(
      "missing_supabase_url", 
      "Supabase URL is not configured. Please check your Supabase environment variables."
    );
  }
  
  // Check API key format - Calendly PAT tokens now start with "eyJr" (JWT format)
  if (!CALENDLY_API_KEY.startsWith("eyJr")) {
    console.error("CALENDLY_API_KEY does not appear to be in the expected JWT format for Personal Access Tokens");
    console.error("API key starts with:", CALENDLY_API_KEY.substring(0, 4));
    
    return createErrorResponse(
      "invalid_api_key_format", 
      "The Calendly API key does not appear to be in the expected format for a Personal Access Token.",
      debugMode ? `API key starts with: ${CALENDLY_API_KEY.substring(0, 4)}...` : undefined
    );
  }
  
  return null; // No error
}

// Main handler function
const handler = async (req: Request): Promise<Response> => {
  // Log request details
  console.log(`Request method: ${req.method}`);
  console.log(`Request headers: ${JSON.stringify(Object.fromEntries(req.headers.entries()))}`);
  console.log(`Request URL: ${req.url}`);
  
  // Handle CORS preflight requests - CRITICAL: Always return 200 status
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200
    });
  }

  try {
    // Parse request body for debug flag
    let requestBody: any = {};
    try {
      requestBody = await req.json();
      console.log("Request body:", JSON.stringify(requestBody));
    } catch (e) {
      console.log("No request body or error parsing it:", e);
    }
    
    const debugMode = requestBody?.debug === true;
    const action = requestBody?.action || "setup";
    
    // Validate environment variables
    const envError = validateEnvironment(debugMode);
    if (envError) {
      return envError;
    }

    // Initialize the Calendly API client
    const calendlyClient = new CalendlyApiClient(CALENDLY_API_KEY!, debugMode);

    // Get user organization
    const userOrgResult = await calendlyClient.fetchUserOrganization();
    if (userOrgResult.error) {
      return createErrorResponse(
        userOrgResult.error.code,
        userOrgResult.error.message,
        userOrgResult.error.details
      );
    }
    
    const { organizationUri } = userOrgResult;

    // Generate the webhook URL
    const webhookUrl = `${SUPABASE_URL}/functions/v1/calendly-webhook`;
    console.log(`Creating webhook subscription to URL: ${webhookUrl}`);
    
    // Check for existing webhooks
    const webhooksResult = await calendlyClient.checkExistingWebhooks(webhookUrl);
    if (webhooksResult.error) {
      return createErrorResponse(
        webhooksResult.error.code,
        webhooksResult.error.message,
        webhooksResult.error.details
      );
    }
    
    // If webhook already exists, return success
    if (webhooksResult.existingWebhook) {
      return createResponse({ 
        success: true, 
        message: "Calendly webhook subscription already exists",
        data: webhooksResult.existingWebhook
      });
    }
    
    // Create webhook subscription
    const createResult = await calendlyClient.createWebhookSubscription(organizationUri, webhookUrl);
    if (createResult.error) {
      return createErrorResponse(
        createResult.error.code,
        createResult.error.message,
        createResult.error.details
      );
    }
    
    // Return success response
    return createResponse({ 
      success: true, 
      message: "Calendly webhook subscription created successfully",
      data: createResult.webhookData
    });
    
  } catch (error: any) {
    console.error(`Error setting up Calendly webhook: ${error.message}`, error.stack);
    // Always return 200 status with error in body to prevent the non-2xx error
    return createResponse({ 
      success: false, 
      error: "unexpected_error", 
      message: error.message || "An unexpected error occurred while setting up the webhook.",
      stack: error.stack
    });
  }
};

serve(handler);

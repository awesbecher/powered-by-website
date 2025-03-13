
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

// Enhanced debugging logs for environment variables
console.log("Environment check for calendly-manage-webhook function:");
console.log(`- CALENDLY_API_KEY configured: ${!!CALENDLY_API_KEY}, ${CALENDLY_API_KEY ? "Length: " + CALENDLY_API_KEY.length : "MISSING - THIS IS REQUIRED"}`);
console.log(`- SUPABASE_URL configured: ${!!SUPABASE_URL}, ${SUPABASE_URL || "MISSING - THIS IS REQUIRED"}`);

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
    
    // Always return a 200 status with error information in the body
    // This avoids the non-2xx error that's causing problems
    
    // Validate required environment variables
    if (!CALENDLY_API_KEY) {
      console.error("CALENDLY_API_KEY environment variable is not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "missing_api_key", 
          message: "Calendly API key is not configured. Please check your Supabase environment variables." 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    if (!SUPABASE_URL) {
      console.error("SUPABASE_URL environment variable is not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "missing_supabase_url", 
          message: "Supabase URL is not configured. Please check your Supabase environment variables." 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    // Check API key format - Calendly PAT tokens now start with "eyJr" (JWT format)
    if (!CALENDLY_API_KEY.startsWith("eyJr")) {
      console.error("CALENDLY_API_KEY does not appear to be in the expected JWT format for Personal Access Tokens");
      console.error("API key starts with:", CALENDLY_API_KEY.substring(0, 4));
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "invalid_api_key_format", 
          message: "The Calendly API key does not appear to be in the expected format for a Personal Access Token.",
          details: debugMode ? `API key starts with: ${CALENDLY_API_KEY.substring(0, 4)}...` : undefined
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    console.log("Attempting to fetch user organization with API key");
    
    // Get user organization
    const orgResponse = await fetch("https://api.calendly.com/users/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      }
    });

    // Save the full response for debugging
    const orgResponseStatus = orgResponse.status;
    const orgResponseText = await orgResponse.text();
    console.log(`Organization API response status: ${orgResponseStatus}`);
    console.log(`Organization API response (first 500 chars): ${orgResponseText.substring(0, 500)}`);

    if (!orgResponse.ok) {
      let errorMessage = `Failed to fetch user information: Status ${orgResponseStatus}`;
      let errorCode = "api_authorization_failed";
      let errorDetails = orgResponseText;
      
      try {
        const errorData = JSON.parse(orgResponseText);
        console.error("Detailed error from Calendly API:", errorData);
        
        if (errorData.message) {
          errorMessage = `Calendly API error: ${errorData.message}`;
          
          // Set specific error codes for common issues
          if (errorData.message.includes("authentication") || errorData.message.includes("Authorization")) {
            errorCode = "invalid_api_key";
            errorMessage = "Invalid Calendly API key. Please check that you're using a valid Personal Access Token.";
          } else if (errorData.message.includes("permission")) {
            errorCode = "insufficient_permissions";
          }
        }
      } catch (e) {
        // If we can't parse the JSON, use the raw text
        console.error("Error parsing Calendly API error response:", e);
        errorMessage = `Calendly API error: ${orgResponseText.substring(0, 100)}`;
        errorCode = "api_response_error";
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: errorCode, 
          message: errorMessage,
          status: orgResponseStatus,
          raw_response: debugMode ? orgResponseText.substring(0, 500) : undefined 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    let userData;
    try {
      userData = JSON.parse(orgResponseText);
      console.log("Parsed user data:", JSON.stringify(userData).substring(0, 500));
    } catch (error) {
      console.error("Failed to parse Calendly API response:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "invalid_response", 
          message: "Failed to parse Calendly user data response. Please try again later.",
          raw_response: debugMode ? orgResponseText.substring(0, 200) : undefined
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    if (!userData.resource) {
      console.error("Missing resource in Calendly API response:", userData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "missing_user_data", 
          message: "Calendly API returned an unexpected response format. Missing user resource data.",
          raw_response: debugMode ? JSON.stringify(userData).substring(0, 200) : undefined
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    const currentUser = userData.resource;
    const organizationUri = currentUser.current_organization;
    
    if (!organizationUri) {
      console.error("Missing organization URI in Calendly user data:", currentUser);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "missing_organization", 
          message: "Could not find organization information in your Calendly account. Please ensure your account is properly set up.",
          user_data: debugMode ? currentUser : undefined
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    console.log(`User organization: ${organizationUri}`);

    // Generate the webhook URL
    const webhookUrl = `${SUPABASE_URL}/functions/v1/calendly-webhook`;
    console.log(`Creating webhook subscription to URL: ${webhookUrl}`);
    
    // Get existing webhooks first to avoid duplicates
    console.log("Checking for existing webhooks");
    const existingWebhooksResponse = await fetch("https://api.calendly.com/webhook_subscriptions", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      }
    });
    
    const existingWebhooksStatus = existingWebhooksResponse.status;
    const existingWebhooksText = await existingWebhooksResponse.text();
    console.log(`Existing webhooks API response status: ${existingWebhooksStatus}`);
    console.log(`Existing webhooks API response (first 500 chars): ${existingWebhooksText.substring(0, 500)}`);
    
    if (!existingWebhooksResponse.ok) {
      console.error("Failed to fetch existing webhooks:", existingWebhooksText);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "webhook_list_failed", 
          message: `Failed to fetch existing webhooks. Status: ${existingWebhooksStatus}`,
          raw_response: debugMode ? existingWebhooksText.substring(0, 200) : undefined
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    let existingWebhooksData;
    try {
      existingWebhooksData = JSON.parse(existingWebhooksText);
      console.log(`Existing webhooks parsed:`, existingWebhooksData);
      
      // Check if a webhook with the same URL already exists
      const existingWebhook = existingWebhooksData.collection?.find(
        (webhook: any) => webhook.attributes?.url === webhookUrl
      );
      
      if (existingWebhook) {
        console.log(`Webhook already exists:`, existingWebhook);
        return new Response(JSON.stringify({ 
          success: true, 
          message: "Calendly webhook subscription already exists",
          data: existingWebhook
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    } catch (error) {
      console.error("Failed to parse existing webhooks response:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "webhook_parse_error", 
          message: "Failed to process webhook data. Please try again later.",
          raw_response: debugMode ? existingWebhooksText.substring(0, 200) : undefined
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
    
    // Create webhook subscription
    console.log("Creating new webhook subscription");
    const webhookRequestBody = {
      url: webhookUrl,
      events: ["invitee.created", "invitee.canceled"],
      organization: organizationUri,
      scope: "organization"
    };
    console.log("Webhook request body:", JSON.stringify(webhookRequestBody));
    
    const webhookResponse = await fetch("https://api.calendly.com/webhook_subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      },
      body: JSON.stringify(webhookRequestBody)
    });

    const webhookResponseStatus = webhookResponse.status;
    const webhookResponseText = await webhookResponse.text();
    console.log(`Webhook API response status: ${webhookResponseStatus}`);
    console.log(`Webhook API response: ${webhookResponseText}`);
    
    if (!webhookResponse.ok) {
      let errorMessage = "Failed to create webhook subscription";
      let errorCode = "webhook_creation_failed";
      
      try {
        const webhookData = JSON.parse(webhookResponseText);
        console.error("Webhook creation failed:", webhookData);
        
        if (webhookData.message) {
          errorMessage = `Calendly webhook error: ${webhookData.message}`;
        } else if (webhookData.errors && webhookData.errors.length > 0) {
          errorMessage = `Calendly webhook error: ${webhookData.errors.map((e: any) => e.message).join(", ")}`;
          
          // Set specific error codes for common issues
          if (webhookData.errors.some((e: any) => e.message.includes("URL"))) {
            errorCode = "invalid_webhook_url";
          }
        }
      } catch (e) {
        console.error("Error parsing webhook error response:", e);
        errorMessage = `Failed to create webhook: ${webhookResponseStatus} - ${webhookResponseText.substring(0, 100)}`;
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: errorCode, 
          message: errorMessage,
          status: webhookResponseStatus,
          raw_response: debugMode ? webhookResponseText.substring(0, 300) : undefined
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    let webhookData;
    try {
      webhookData = JSON.parse(webhookResponseText);
      console.log(`Webhook created successfully:`, webhookData);
    } catch (error) {
      console.error("Failed to parse webhook creation response:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "webhook_response_parse_error", 
          message: "Webhook was created but response couldn't be processed.", 
          raw_response: debugMode ? webhookResponseText.substring(0, 200) : undefined
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Calendly webhook subscription created successfully",
      data: webhookData
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error(`Error setting up Calendly webhook: ${error.message}`, error.stack);
    // Always return 200 status with error in body to prevent the non-2xx error
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "unexpected_error", 
        message: error.message || "An unexpected error occurred while setting up the webhook.",
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  }
};

serve(handler);

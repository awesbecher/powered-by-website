
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

// Enhanced debugging logs for environment variables
console.log("Environment check for calendly-manage-webhook function:");
console.log(`- CALENDLY_API_KEY configured: ${!!CALENDLY_API_KEY}, ${CALENDLY_API_KEY ? "Length: " + CALENDLY_API_KEY.length : "MISSING - THIS IS REQUIRED"}`);
console.log(`- SUPABASE_URL configured: ${!!SUPABASE_URL}, ${SUPABASE_URL || "MISSING - THIS IS REQUIRED"}`);

// Helper function to create a standardized response
function createResponse(body: any, status = 200) {
  return new Response(
    JSON.stringify(body),
    { 
      headers: { ...corsHeaders, "Content-Type": "application/json" }, 
      status 
    }
  );
}

// Helper function to create an error response
function createErrorResponse(error: string, message: string, details?: any, debugMode = false) {
  return createResponse({ 
    success: false, 
    error, 
    message,
    ...(debugMode && details ? { details } : {})
  });
}

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

// Fetch user organization details
async function fetchUserOrganization(debugMode = false) {
  console.log("Attempting to fetch user organization with API key");
  
  try {
    const response = await fetch("https://api.calendly.com/users/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      }
    });

    const responseStatus = response.status;
    const responseText = await response.text();
    console.log(`Organization API response status: ${responseStatus}`);
    console.log(`Organization API response (first 500 chars): ${responseText.substring(0, 500)}`);

    if (!response.ok) {
      let errorMessage = `Failed to fetch user information: Status ${responseStatus}`;
      let errorCode = "api_authorization_failed";
      
      try {
        const errorData = JSON.parse(responseText);
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
        errorMessage = `Calendly API error: ${responseText.substring(0, 100)}`;
        errorCode = "api_response_error";
      }
      
      return {
        error: createErrorResponse(
          errorCode, 
          errorMessage,
          debugMode ? responseText.substring(0, 500) : undefined
        )
      };
    }

    try {
      const userData = JSON.parse(responseText);
      console.log("Parsed user data:", JSON.stringify(userData).substring(0, 500));
      
      if (!userData.resource) {
        console.error("Missing resource in Calendly API response:", userData);
        return {
          error: createErrorResponse(
            "missing_user_data", 
            "Calendly API returned an unexpected response format. Missing user resource data.",
            debugMode ? JSON.stringify(userData).substring(0, 200) : undefined
          )
        };
      }
      
      const currentUser = userData.resource;
      const organizationUri = currentUser.current_organization;
      
      if (!organizationUri) {
        console.error("Missing organization URI in Calendly user data:", currentUser);
        return {
          error: createErrorResponse(
            "missing_organization", 
            "Could not find organization information in your Calendly account. Please ensure your account is properly set up.",
            debugMode ? currentUser : undefined
          )
        };
      }
      
      console.log(`User organization: ${organizationUri}`);
      return { organizationUri, currentUser };
      
    } catch (error) {
      console.error("Failed to parse Calendly API response:", error);
      return {
        error: createErrorResponse(
          "invalid_response", 
          "Failed to parse Calendly user data response. Please try again later.",
          debugMode ? responseText.substring(0, 200) : undefined
        )
      };
    }
  } catch (error: any) {
    console.error("Error fetching user organization:", error);
    return {
      error: createErrorResponse(
        "fetch_error", 
        `Error fetching user data: ${error.message}`,
        debugMode ? error.stack : undefined
      )
    };
  }
}

// Check for existing webhooks
async function checkExistingWebhooks(webhookUrl: string, debugMode = false) {
  console.log("Checking for existing webhooks");
  
  try {
    const response = await fetch("https://api.calendly.com/webhook_subscriptions", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      }
    });
    
    const responseStatus = response.status;
    const responseText = await response.text();
    console.log(`Existing webhooks API response status: ${responseStatus}`);
    console.log(`Existing webhooks API response (first 500 chars): ${responseText.substring(0, 500)}`);
    
    if (!response.ok) {
      console.error("Failed to fetch existing webhooks:", responseText);
      return {
        error: createErrorResponse(
          "webhook_list_failed", 
          `Failed to fetch existing webhooks. Status: ${responseStatus}`,
          debugMode ? responseText.substring(0, 200) : undefined
        )
      };
    }
    
    try {
      const webhooksData = JSON.parse(responseText);
      console.log(`Existing webhooks parsed:`, webhooksData);
      
      // Check if a webhook with the same URL already exists
      const existingWebhook = webhooksData.collection?.find(
        (webhook: any) => webhook.attributes?.url === webhookUrl
      );
      
      if (existingWebhook) {
        console.log(`Webhook already exists:`, existingWebhook);
        return { existingWebhook };
      }
      
      return { webhooksData };
      
    } catch (error) {
      console.error("Failed to parse existing webhooks response:", error);
      return {
        error: createErrorResponse(
          "webhook_parse_error", 
          "Failed to process webhook data. Please try again later.",
          debugMode ? responseText.substring(0, 200) : undefined
        )
      };
    }
  } catch (error: any) {
    console.error("Error checking existing webhooks:", error);
    return {
      error: createErrorResponse(
        "webhook_check_error", 
        `Error checking existing webhooks: ${error.message}`,
        debugMode ? error.stack : undefined
      )
    };
  }
}

// Create a webhook subscription
async function createWebhookSubscription(organizationUri: string, webhookUrl: string, debugMode = false) {
  console.log("Creating new webhook subscription");
  const webhookRequestBody = {
    url: webhookUrl,
    events: ["invitee.created", "invitee.canceled"],
    organization: organizationUri,
    scope: "organization"
  };
  console.log("Webhook request body:", JSON.stringify(webhookRequestBody));
  
  try {
    const response = await fetch("https://api.calendly.com/webhook_subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CALENDLY_API_KEY}`
      },
      body: JSON.stringify(webhookRequestBody)
    });

    const responseStatus = response.status;
    const responseText = await response.text();
    console.log(`Webhook API response status: ${responseStatus}`);
    console.log(`Webhook API response: ${responseText}`);
    
    if (!response.ok) {
      let errorMessage = "Failed to create webhook subscription";
      let errorCode = "webhook_creation_failed";
      
      try {
        const webhookData = JSON.parse(responseText);
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
        errorMessage = `Failed to create webhook: ${responseStatus} - ${responseText.substring(0, 100)}`;
      }
      
      return {
        error: createErrorResponse(
          errorCode, 
          errorMessage,
          debugMode ? responseText.substring(0, 300) : undefined
        )
      };
    }

    try {
      const webhookData = JSON.parse(responseText);
      console.log(`Webhook created successfully:`, webhookData);
      return { webhookData };
    } catch (error) {
      console.error("Failed to parse webhook creation response:", error);
      return {
        error: createErrorResponse(
          "webhook_response_parse_error", 
          "Webhook was created but response couldn't be processed.", 
          debugMode ? responseText.substring(0, 200) : undefined
        )
      };
    }
  } catch (error: any) {
    console.error("Error creating webhook subscription:", error);
    return {
      error: createErrorResponse(
        "webhook_creation_error", 
        `Error creating webhook: ${error.message}`,
        debugMode ? error.stack : undefined
      )
    };
  }
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

    // Get user organization
    const userOrgResult = await fetchUserOrganization(debugMode);
    if (userOrgResult.error) {
      return userOrgResult.error;
    }
    
    const { organizationUri } = userOrgResult;

    // Generate the webhook URL
    const webhookUrl = `${SUPABASE_URL}/functions/v1/calendly-webhook`;
    console.log(`Creating webhook subscription to URL: ${webhookUrl}`);
    
    // Check for existing webhooks
    const webhooksResult = await checkExistingWebhooks(webhookUrl, debugMode);
    if (webhooksResult.error) {
      return webhooksResult.error;
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
    const createResult = await createWebhookSubscription(organizationUri, webhookUrl, debugMode);
    if (createResult.error) {
      return createResult.error;
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

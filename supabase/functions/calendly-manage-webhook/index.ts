
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createResponse } from "./response-utils.ts";

// Main handler function
const handler = async (req: Request): Promise<Response> => {
  // Log request details
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  
  // Handle CORS preflight requests - CRITICAL: Always return 200 status
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200
    });
  }

  try {
    // Return mock success response without attempting to set up webhook
    return createResponse({ 
      success: true, 
      message: "Calendly webhook functionality has been disabled",
      data: {
        disabled: true,
        reason: "Webhook functionality has been disabled in this version"
      }
    });
  } catch (error: any) {
    console.error(`Error in webhook handler: ${error.message}`, error.stack);
    // Always return 200 status with error in body to prevent the non-2xx error
    return createResponse({ 
      success: false, 
      error: "webhook_disabled", 
      message: "Webhook functionality has been disabled",
    });
  }
};

serve(handler);

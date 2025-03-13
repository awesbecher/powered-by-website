
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

// Main handler function
const handler = async (req: Request): Promise<Response> => {
  // Log request details
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log incoming request but don't process it
    console.log("Received webhook request (functionality disabled)");
    
    // Simply return success without processing
    return new Response(JSON.stringify({ 
      success: true,
      message: "Webhook functionality has been disabled" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error(`Error in webhook handler: ${error.message}`, error.stack);
    return new Response(
      JSON.stringify({ 
        error: "webhook_disabled",
        message: "Webhook functionality has been disabled" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Always return 200 to avoid webhook retries
      }
    );
  }
};

serve(handler);

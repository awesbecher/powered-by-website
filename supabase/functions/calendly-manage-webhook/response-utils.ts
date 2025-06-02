
import { corsHeaders } from "../_shared/cors.ts";

// Helper function to create a standardized response
export function createResponse(body: any, status = 200) {
  return new Response(
    JSON.stringify(body),
    { 
      headers: { ...corsHeaders, "Content-Type": "application/json" }, 
      status 
    }
  );
}

// Helper function to create an error response
export function createErrorResponse(error: string, message: string, details?: any) {
  return createResponse({ 
    success: false, 
    error, 
    message,
    ...(details ? { details } : {})
  });
}

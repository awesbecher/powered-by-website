
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Configure CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle incoming requests
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    // Initialize Supabase client with the service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const { event, message, clinicName, userEmail, filesUploaded } = await req.json();

    // Validate required fields
    if (!event || !message) {
      throw new Error("Missing required fields: event and message are required");
    }

    // Insert log into the gpt_logs table
    const { data, error } = await supabase
      .from('gpt_logs')
      .insert({
        event,
        message,
        clinic_name: clinicName,
        user_email: userEmail,
        files_uploaded: filesUploaded
      });

    if (error) {
      throw error;
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Log entry created successfully" 
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error logging usage:", error);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Team email recipients
const TEAM_EMAILS = [
  "andrew@poweredby.agency", 
  "team@poweredby.agency",
  "website-new-leads-aaaapv2sqra7c2mhua2ovvo2ne@madronecapitalllc.slack.com"
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log(`Request received: ${req.method} ${new Date().toISOString()}`);
  
  try {
    // Parse request body and log it
    const formData = await req.json();
    console.log("Form data received:", JSON.stringify(formData));
    
    // Basic validation
    if (!formData.email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Log the submission data
    console.log("Form submission data:", JSON.stringify({
      name: `${formData.firstName || ""} ${formData.lastName || ""}`,
      email: formData.email,
      phoneNumber: formData.phoneNumber || "Not provided",
      companyName: formData.companyName || "Not provided",
      jobTitle: formData.jobTitle || "Not provided",
      productInterests: formData.productInterests || [],
      message: formData.message || "No message provided",
      source: formData.source || "Not specified"
    }));

    // In production, this would send an email
    console.log(`In production, this would send to: ${TEAM_EMAILS.join(", ")}`);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Form submission received successfully",
        id: `demo-${Date.now()}`
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    // Log any errors
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "An error occurred processing your request"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});

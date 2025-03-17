
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
    // Parse request body
    const formData = await req.json();
    console.log("Received form data:", JSON.stringify(formData));
    
    // Basic validation
    if (!formData.email) {
      console.error("Missing required field: email");
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Instead of sending an email, just log the submission and return success
    console.log("Form submission received with data:", JSON.stringify({
      name: `${formData.firstName || ""} ${formData.lastName || ""}`,
      email: formData.email,
      phoneNumber: formData.phoneNumber || "Not provided",
      companyName: formData.companyName || "Not provided",
      jobTitle: formData.jobTitle || "Not provided",
      productInterests: formData.productInterests || [],
      message: formData.message || "No message provided",
      source: formData.source || "Not specified"
    }));

    // Log where this would be sent in a production environment
    console.log(`In production, this would send an email to: ${TEAM_EMAILS.join(", ")}`);
    
    // Return a success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Form submission received successfully. Our team will contact you soon.",
        id: `demo-${Date.now()}` // Simulated response ID
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "An error occurred while processing your request. Please try again later."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});

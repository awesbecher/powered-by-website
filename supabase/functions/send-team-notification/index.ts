
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key from environment variables
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Team email recipients
const TEAM_EMAILS = [
  "andrew@poweredby.agency", 
  "team@poweredby.agency",
  "website-new-leads-aaaapv2sqra7c2mhua2ovvo2ne@madronecapitalllc.slack.com"
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Enhanced request logging
  console.log(`======= NEW REQUEST =======`);
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  console.log(`Request timestamp: ${new Date().toISOString()}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // API key validation with detailed logging
    if (!RESEND_API_KEY) {
      console.error("CRITICAL ERROR: Resend API key is not configured in environment variables");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service configuration error: Missing API key"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    console.log("Resend API key status:", RESEND_API_KEY ? "Configured" : "Missing");
    console.log("Team email recipients:", TEAM_EMAILS);

    // Parse and validate form data
    const requestBody = await req.text();
    console.log("Raw request body length:", requestBody.length);
    console.log("Raw request body preview:", requestBody.substring(0, 100) + "...");
    
    let formData;
    try {
      formData = JSON.parse(requestBody);
    } catch (parseError) {
      console.error("Failed to parse request body as JSON:", parseError);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Invalid request format: Unable to parse JSON" 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    console.log("Parsed form data:", formData);

    // Validate required fields
    if (!formData.email) {
      console.error("Missing required field: email");
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Missing required fields: email is required" 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Build comprehensive email body with all form data
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p>You have received a new contact form submission from the Voice AI page:</p>
      <ul>
        <li><strong>Name:</strong> ${formData.firstName || ""} ${formData.lastName || ""}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Phone:</strong> ${formData.phoneNumber || "Not provided"}</li>
        <li><strong>Company:</strong> ${formData.companyName || "Not provided"}</li>
        <li><strong>Job Title:</strong> ${formData.jobTitle || "Not provided"}</li>
        <li><strong>Product Interests:</strong> ${formData.productInterests ? formData.productInterests.join(", ") : "None specified"}</li>
        <li><strong>Message:</strong> ${formData.message || "No message provided"}</li>
        <li><strong>Source:</strong> ${formData.source || "Not specified"}</li>
      </ul>
      <p>Please respond to this inquiry within 24 hours.</p>
    `;

    // Detailed email operation logging
    console.log("Attempting to send email to:", TEAM_EMAILS);
    console.log("Email subject: New Voice AI Contact Form Submission");
    
    try {
      // Create a new Resend instance with each request to avoid stale connections
      const resend = new Resend(RESEND_API_KEY);
      
      // Send email with improved error handling
      console.log("Sending email via Resend API...");
      const emailResponse = await resend.emails.send({
        from: "PoweredBy Agency <no-reply@poweredby.ai>", // Use a verified domain
        to: TEAM_EMAILS,
        subject: "New Voice AI Contact Form Submission",
        html: emailHtml,
        text: `New Contact Form Submission from ${formData.firstName} ${formData.lastName} (${formData.email})`,
      });
      
      // Log the complete response for debugging
      console.log("Resend API complete response:", JSON.stringify(emailResponse));
      
      // Check if the response contains an error object from Resend
      if (emailResponse.error) {
        console.error("Resend API returned error:", emailResponse.error);
        
        // Return a user-friendly error
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Failed to send email notification",
            details: emailResponse.error
          }),
          {
            status: 400, // Use 400 instead of 500 as it may be due to invalid input
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      
      console.log("Email sent successfully with ID:", emailResponse.id);
      
      // Return success response
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Team notification sent successfully",
          id: emailResponse.id
        }), 
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } catch (sendError) {
      console.error("Exception while sending email:", sendError);
      
      // Detailed error logging
      if (sendError instanceof Error) {
        console.error("Error name:", sendError.name);
        console.error("Error message:", sendError.message);
        console.error("Error stack:", sendError.stack);
      }
      
      // Return a consistent error response
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email sending failed",
          message: sendError instanceof Error ? sendError.message : "Unknown error"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("========= UNHANDLED ERROR =========");
    console.error("Error:", error);
    
    // Log full error details
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    // Return a generic error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "An unexpected error occurred",
        message: error instanceof Error ? error.message : "Unknown server error",
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

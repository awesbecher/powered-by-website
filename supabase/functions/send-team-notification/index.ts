
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key from environment variables
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(RESEND_API_KEY);

// Update to include both email addresses
const TEAM_EMAILS = ["andrew@poweredby.agency", "team@poweredby.agency"];

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
  console.log(`Request headers:`, Object.fromEntries([...req.headers.entries()]));
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verbose API key validation
    if (!RESEND_API_KEY) {
      console.error("CRITICAL ERROR: Resend API key is not configured in environment variables");
      throw new Error("Email service configuration error: Missing API key");
    }
    
    console.log("Resend API key status:", RESEND_API_KEY ? "Configured" : "Missing");
    console.log("Resend API key prefix:", RESEND_API_KEY?.substring(0, 5));

    // Parse and validate form data
    const requestBody = await req.text();
    console.log("Raw request body length:", requestBody.length);
    console.log("Raw request body preview:", requestBody.substring(0, 100) + "...");
    
    let formData;
    try {
      formData = JSON.parse(requestBody);
    } catch (parseError) {
      console.error("Failed to parse request body as JSON:", parseError);
      throw new Error("Invalid request format: Unable to parse JSON");
    }
    
    console.log("Parsed form data:", formData);

    // Validate required fields
    if (!formData.email) {
      console.error("Missing required field: email");
      throw new Error("Missing required fields: email is required");
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

    // Log destination emails
    console.log("Attempting to send email to:", TEAM_EMAILS);
    console.log("Email HTML content preview:", emailHtml.substring(0, 200) + "...");
    
    // Send email with detailed error handling
    let emailResponse;
    try {
      emailResponse = await resend.emails.send({
        from: "Voice AI Contact Form <onboarding@resend.dev>",
        to: TEAM_EMAILS,
        subject: "New Voice AI Contact Form Submission",
        html: emailHtml,
        text: `New Contact Form Submission from ${formData.firstName} ${formData.lastName} (${formData.email})`,
      });
      
      console.log("Resend API response:", emailResponse);
    } catch (sendError) {
      console.error("Resend API error:", sendError);
      if (sendError instanceof Error) {
        console.error("Resend error details:", { 
          name: sendError.name, 
          message: sendError.message,
          stack: sendError.stack
        });
      }
      throw new Error(`Email sending failed: ${sendError instanceof Error ? sendError.message : "Unknown error"}`);
    }
    
    console.log("Team notification email sent successfully");
    console.log("Response details:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Team notification sent successfully",
        details: emailResponse
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("========= ERROR SENDING TEAM NOTIFICATION =========");
    console.error("Error:", error);
    
    // Log full error details
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error",
        details: "Error processing contact form submission"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

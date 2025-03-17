
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
// Update to include both email addresses
const TEAM_EMAILS = ["andrew@poweredby.agency", "team@poweredby.agency"];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Log request details
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log Resend API key status (partially masked for security)
    const apiKey = Deno.env.get("RESEND_API_KEY");
    console.log("Resend API key status:", apiKey ? `Configured (starts with ${apiKey.substring(0, 3)}...)` : "Missing");

    const formData = await req.json();
    console.log("Received contact form data:", formData);

    // Validate form data
    if (!formData.email) {
      throw new Error("Missing required fields");
    }

    // Build a more comprehensive email body with all form data
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p>You have received a new contact form submission from the Voice AI page:</p>
      <ul>
        <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
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

    // Send email notification to team
    console.log("Attempting to send email to:", TEAM_EMAILS);
    const emailResponse = await resend.emails.send({
      from: "Voice AI Contact Form <onboarding@resend.dev>",
      to: TEAM_EMAILS,
      subject: "New Voice AI Contact Form Submission",
      html: emailHtml,
    });
    
    console.log("Team notification email response:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Team notification sent successfully" 
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending team notification:", error);
    
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

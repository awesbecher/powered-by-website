
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
// Update to include both email addresses
const TEAM_EMAILS = ["andrew@madrone.capital", "team@poweredby.agency"];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  referralSource: string;
  email: string;
  phone: string;
}

serve(async (req) => {
  // Log request details
  console.log(`Request method: ${req.method}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form data:", formData);

    // Validate form data
    if (!formData.email) {
      throw new Error("Missing required fields");
    }

    // Send email notification to team
    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: TEAM_EMAILS,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p>You have received a new contact form submission:</p>
        <ul>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Referral Source:</strong> ${formData.referralSource}</li>
          <li><strong>Phone:</strong> ${formData.phone || "Not provided"}</li>
        </ul>
        <p>Please respond to this inquiry within 24 hours.</p>
      `,
    });
    
    console.log("Team notification email sent:", emailResponse);

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
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

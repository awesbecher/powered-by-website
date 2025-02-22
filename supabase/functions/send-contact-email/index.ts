
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
const SALES_EMAIL = Deno.env.get("SALES_EMAIL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!ADMIN_EMAIL || !SALES_EMAIL) {
      throw new Error("Recipient emails not configured");
    }

    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", formData);

    // Send email to both addresses
    const emailResponse = await resend.emails.send({
      from: "Lovable AI <onboarding@resend.dev>",
      to: [ADMIN_EMAIL, SALES_EMAIL],
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <h3>Message:</h3>
        <p>${formData.message}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
const SALES_EMAIL = Deno.env.get("SALES_EMAIL");
const HUBSPOT_API_KEY = Deno.env.get("HUBSPOT_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  title: string;
  reason: string;
}

async function createHubspotContact(formData: ContactFormData) {
  if (!HUBSPOT_API_KEY) {
    console.error("Hubspot API key not configured");
    return { error: "Hubspot API key not configured" };
  }

  try {
    // Create contact in Hubspot
    const contactResponse = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HUBSPOT_API_KEY}`
      },
      body: JSON.stringify({
        properties: {
          email: formData.email,
          firstname: formData.name.split(" ")[0],
          lastname: formData.name.split(" ").slice(1).join(" ") || "",
          company: formData.company,
          jobtitle: formData.title
        }
      })
    });

    if (!contactResponse.ok) {
      const errorData = await contactResponse.json();
      console.error("Error creating Hubspot contact:", errorData);
      return { error: errorData };
    }

    const contactData = await contactResponse.json();
    console.log("Hubspot contact created:", contactData);

    // Create a note with the message
    const noteResponse = await fetch("https://api.hubapi.com/crm/v3/objects/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HUBSPOT_API_KEY}`
      },
      body: JSON.stringify({
        properties: {
          hs_note_body: `Message: ${formData.message}\n\nReason for contact: ${formData.reason}`,
          hs_timestamp: Date.now(),
        },
        associations: [
          {
            to: {
              id: contactData.id
            },
            types: [
              {
                associationCategory: "HUBSPOT_DEFINED",
                associationTypeId: 1
              }
            ]
          }
        ]
      })
    });

    if (!noteResponse.ok) {
      const errorData = await noteResponse.json();
      console.error("Error creating Hubspot note:", errorData);
      return { error: errorData };
    }

    const noteData = await noteResponse.json();
    console.log("Hubspot note created:", noteData);

    return { success: true, contactId: contactData.id };
  } catch (error) {
    console.error("Error in Hubspot API call:", error);
    return { error: error.message };
  }
}

serve(async (req) => {
  // Log request details
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!ADMIN_EMAIL || !SALES_EMAIL) {
      console.error("Email configuration error:", { ADMIN_EMAIL, SALES_EMAIL });
      throw new Error("Recipient emails not configured");
    }

    // Log Resend API key status (partially masked for security)
    const apiKey = Deno.env.get("RESEND_API_KEY");
    console.log("Resend API key status:", apiKey ? `Configured (starts with ${apiKey.substring(0, 3)}...)` : "Missing");

    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", formData);

    // Validate form data
    if (!formData.email || !formData.name) {
      throw new Error("Missing required fields");
    }

    // Send email using Resend
    try {
      const emailResponse = await resend.emails.send({
        from: "Lovable AI <onboarding@resend.dev>",
        to: [ADMIN_EMAIL, SALES_EMAIL],
        subject: "New Contact Form Submission",
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Title:</strong> ${formData.title || 'N/A'}</p>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Reason:</strong> ${formData.reason || 'N/A'}</p>
          <h3>Message:</h3>
          <p>${formData.message}</p>
        `,
      });

      console.log("Email sent successfully:", emailResponse);
      
      // Send a confirmation email to the submitter
      const confirmationResponse = await resend.emails.send({
        from: "Lovable AI <onboarding@resend.dev>",
        to: [formData.email],
        subject: "Thank you for your inquiry",
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Hello ${formData.name},</p>
          <p>We have received your contact form submission and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <blockquote>${formData.message}</blockquote>
          <p>Best regards,<br>The Lovable AI Team</p>
        `,
      });
      
      console.log("Confirmation email sent:", confirmationResponse);
    } catch (emailError) {
      console.error("Resend email error:", emailError);
      throw new Error(`Email sending failed: ${emailError.message}`);
    }

    // Create contact in Hubspot
    let hubspotResponse = null;
    if (HUBSPOT_API_KEY) {
      hubspotResponse = await createHubspotContact(formData);
      console.log("Hubspot integration result:", hubspotResponse);
    } else {
      console.warn("Hubspot integration skipped: No API key provided");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact form processed successfully",
        hubspot: hubspotResponse
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        details: "Error processing contact form submission"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

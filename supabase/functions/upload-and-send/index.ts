
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received upload request");

    // Check if it's a form data request
    const contentType = req.headers.get("content-type") || "";
    
    if (!contentType.includes("multipart/form-data")) {
      throw new Error("Expected multipart/form-data");
    }

    // Parse the form data
    const formData = await req.formData();
    
    // Extract recipient email
    const recipientEmail = formData.get("recipientEmail")?.toString() || ADMIN_EMAIL || "";
    if (!recipientEmail) {
      throw new Error("No recipient email provided and no ADMIN_EMAIL configured");
    }

    // Extract message content
    const message = formData.get("message")?.toString() || "No message provided";

    // Extract files
    const files = [];
    let fileDetailsHtml = "<p>No files were uploaded.</p>";

    // Process each file from the form data
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`Processing file: ${value.name}, type: ${value.type}, size: ${value.size} bytes`);
        
        // Read the file contents
        const fileContent = await value.arrayBuffer();
        const base64Content = btoa(String.fromCharCode(...new Uint8Array(fileContent)));
        
        files.push({
          filename: value.name,
          content: base64Content,
          type: value.type,
        });
      }
    }

    // If we have files, build the file details HTML
    if (files.length > 0) {
      fileDetailsHtml = `
        <h3>Files Uploaded:</h3>
        <ul>
          ${files.map(file => `<li>${file.filename} (${file.type})</li>`).join('')}
        </ul>
      `;
    }

    // Prepare email content
    const htmlContent = `
      <h2>New Upload from Custom GPT</h2>
      <p>${message}</p>
      ${fileDetailsHtml}
      <p>Timestamp: ${new Date().toISOString()}</p>
    `;

    console.log(`Sending email to ${recipientEmail} with ${files.length} attachments`);

    // Send email with attachments
    const emailResponse = await resend.emails.send({
      from: "Upload Service <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: "New Upload from Custom GPT",
      html: htmlContent,
      attachments: files.map(file => ({
        filename: file.filename,
        content: file.content,
        encoding: "base64",
      })),
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Files uploaded and email sent successfully",
        emailResponse 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing upload:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

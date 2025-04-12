
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const tavusApiKey = Deno.env.get('TAVUS_API_KEY');
const tavusApiUrl = "https://api.tavus.io/v2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!tavusApiKey) {
      throw new Error('TAVUS_API_KEY environment variable is not set');
    }

    // Check if the request is a multipart/form-data
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return new Response(
        JSON.stringify({ error: 'Content type must be multipart/form-data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the form data
    const formData = await req.formData();
    const generationId = formData.get('generationId');
    const videoFile = formData.get('video');

    if (!generationId || !videoFile) {
      return new Response(
        JSON.stringify({ error: 'Generation ID and video file are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!(videoFile instanceof File)) {
      return new Response(
        JSON.stringify({ error: 'Invalid video file' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Uploading video for generation ID: ${generationId}`);

    // First, get the upload URL from Tavus
    const uploadUrlResponse = await fetch(`${tavusApiUrl}/generations/${generationId}/upload-url`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tavusApiKey}`,
      },
    });

    const uploadUrlData = await uploadUrlResponse.json();

    if (!uploadUrlResponse.ok) {
      console.error('Failed to get upload URL from Tavus:', uploadUrlData);
      return new Response(
        JSON.stringify({ error: uploadUrlData.message || 'Failed to get upload URL' }),
        { status: uploadUrlResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { url, fields } = uploadUrlData;

    if (!url || !fields) {
      return new Response(
        JSON.stringify({ error: 'Invalid upload URL response from Tavus' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a new FormData for the S3 upload
    const s3FormData = new FormData();
    
    // Add the fields from the presigned URL
    Object.entries(fields).forEach(([key, value]) => {
      s3FormData.append(key, value as string);
    });
    
    // Add the file as the last field
    s3FormData.append('file', videoFile);

    // Upload the file to the presigned URL
    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: s3FormData,
    });

    if (!uploadResponse.ok) {
      console.error('Failed to upload to S3:', uploadResponse.status, uploadResponse.statusText);
      return new Response(
        JSON.stringify({ error: 'Failed to upload video to storage' }),
        { status: uploadResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Video uploaded successfully to S3');

    // Now, tell Tavus that the upload is complete
    const completeResponse = await fetch(`${tavusApiUrl}/generations/${generationId}/upload-complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tavusApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const completeData = await completeResponse.json();

    if (!completeResponse.ok) {
      console.error('Failed to complete upload with Tavus:', completeData);
      return new Response(
        JSON.stringify({ error: completeData.message || 'Failed to process uploaded video' }),
        { status: completeResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Upload completion confirmed with Tavus:', completeData);

    return new Response(
      JSON.stringify({ 
        message: 'Video uploaded and processing initiated',
        generation: completeData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in tavus-upload-video function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

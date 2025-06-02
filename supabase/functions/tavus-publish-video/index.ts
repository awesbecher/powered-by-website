
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

    const { generationId, script } = await req.json();

    if (!generationId || !script) {
      return new Response(
        JSON.stringify({ error: 'Generation ID and script are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Publishing video for generation ID: ${generationId}`);

    // First, check if the generation is ready
    const statusResponse = await fetch(`${tavusApiUrl}/generations/${generationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tavusApiKey}`,
      },
    });

    const statusData = await statusResponse.json();
    
    if (!statusResponse.ok) {
      console.error('Tavus API error when checking generation status:', statusData);
      return new Response(
        JSON.stringify({ error: statusData.message || 'Failed to check generation status' }),
        { status: statusResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (statusData.status !== 'completed') {
      return new Response(
        JSON.stringify({ error: `Generation is not ready for publishing. Current status: ${statusData.status}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Now create a video with the generation
    const createVideoResponse = await fetch(`${tavusApiUrl}/videos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tavusApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        generation_id: generationId,
        content: script
      }),
    });

    const videoData = await createVideoResponse.json();
    
    if (!createVideoResponse.ok) {
      console.error('Tavus API error when creating video:', videoData);
      return new Response(
        JSON.stringify({ error: videoData.message || 'Failed to create video' }),
        { status: createVideoResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const videoId = videoData.id;
    console.log(`Video created with ID: ${videoId}`);

    // Poll for video status until it's completed or fails
    let videoStatus = 'processing';
    let videoUrl = '';
    let attempts = 0;
    const maxAttempts = 30; // Try for up to 5 minutes (10-second intervals)
    
    while (videoStatus === 'processing' && attempts < maxAttempts) {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      
      const videoStatusResponse = await fetch(`${tavusApiUrl}/videos/${videoId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tavusApiKey}`,
        },
      });
      
      const videoStatusData = await videoStatusResponse.json();
      
      if (!videoStatusResponse.ok) {
        console.error('Tavus API error when checking video status:', videoStatusData);
        continue;
      }
      
      videoStatus = videoStatusData.status;
      console.log(`Video status after attempt ${attempts}: ${videoStatus}`);
      
      if (videoStatus === 'completed') {
        videoUrl = videoStatusData.url;
        break;
      } else if (videoStatus === 'failed') {
        return new Response(
          JSON.stringify({ error: 'Video processing failed' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    
    if (videoStatus !== 'completed') {
      return new Response(
        JSON.stringify({ error: 'Video processing timed out or did not complete' }),
        { status: 504, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Video published successfully',
        id: videoId,
        url: videoUrl,
        status: videoStatus
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in tavus-publish-video function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

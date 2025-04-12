
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

    // Parse the URL and get the generation ID
    const url = new URL(req.url);
    const generationId = url.searchParams.get('id');

    if (!generationId) {
      return new Response(
        JSON.stringify({ error: 'Generation ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Checking status for generation ID: ${generationId}`);

    const response = await fetch(`${tavusApiUrl}/generations/${generationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tavusApiKey}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Tavus API error:', data);
      return new Response(
        JSON.stringify({ error: data.message || 'Failed to fetch generation status' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Tavus generation status retrieved successfully');

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in tavus-generation-status function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

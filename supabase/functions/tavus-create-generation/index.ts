
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const tavusApiKey = Deno.env.get('TAVUS_API_KEY');
const tavusApiUrl = "https://api.tavus.io/v2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Log incoming request for debugging
  console.log(`Received ${req.method} request to tavus-create-generation`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!tavusApiKey) {
      console.error('TAVUS_API_KEY environment variable is not set');
      throw new Error('TAVUS_API_KEY environment variable is not set');
    }
    
    console.log('TAVUS_API_KEY is configured properly');

    // Parse request body
    let requestData;
    try {
      const text = await req.text();
      console.log('Request body (raw):', text);
      requestData = text ? JSON.parse(text) : {};
    } catch (error) {
      console.error('Failed to parse request JSON:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Request data (parsed):', requestData);
    const { name, script } = requestData;

    if (!name || !script) {
      console.error('Missing required fields:', { name: !!name, script: !!script });
      return new Response(
        JSON.stringify({ error: 'Name and script are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Trim and process the script to ensure it meets Tavus requirements
    const processedScript = script.trim();
    
    // Check script length - Tavus may have specific requirements
    if (processedScript.length > 10000) {
      return new Response(
        JSON.stringify({ 
          error: 'Script is too long. Maximum 10000 characters allowed.',
          details: { scriptLength: processedScript.length }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Creating Tavus generation with name: ${name}, script length: ${processedScript.length}`);

    // First try to validate if script meets Tavus requirements
    // According to Tavus documentation, the content needs to be at least a few sentences
    if (processedScript.split(' ').length < 10) {
      return new Response(
        JSON.stringify({ error: 'Script is too short. Please provide at least a few complete sentences.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare request payload for Tavus API
    const tavusPayload = {
      name,
      content: processedScript,
      type: "webcam"  // Using webcam type as per Tavus docs
    };
    
    console.log('Tavus API request payload:', tavusPayload);

    // Call Tavus API
    let response;
    try {
      console.log(`Calling Tavus API at ${tavusApiUrl}/generations`);
      response = await fetch(`${tavusApiUrl}/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tavusApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tavusPayload),
      });
      
      console.log('Tavus API response status:', response.status);
      console.log('Tavus API response headers:', Object.fromEntries(response.headers.entries()));
      
    } catch (fetchError) {
      console.error('Network error calling Tavus API:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to connect to Tavus API', details: fetchError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get response as text first for debugging purposes
    let responseText;
    try {
      responseText = await response.text();
      console.log('Tavus API raw response:', responseText);
    } catch (e) {
      console.error('Failed to read Tavus API response as text:', e);
      return new Response(
        JSON.stringify({ error: 'Failed to read response from Tavus API', details: e.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Try to parse the response as JSON
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : null;
      console.log('Tavus API parsed response:', data);
    } catch (e) {
      console.error('Failed to parse Tavus API response as JSON:', e);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON response from Tavus API', 
          details: { 
            parseError: e.message,
            responseText: responseText.substring(0, 500) // Limit response text length in the error
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!response.ok) {
      console.error('Tavus API error:', data || responseText);
      return new Response(
        JSON.stringify({ 
          error: (data && data.message) ? data.message : 'Failed to create generation', 
          details: data || responseText,
          status: response.status,
          statusText: response.statusText
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!data || !data.id) {
      console.error('Missing generation ID in successful Tavus response:', data);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid response format from Tavus API - missing generation ID',
          details: data
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Tavus generation created successfully:', data);

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in tavus-create-generation function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

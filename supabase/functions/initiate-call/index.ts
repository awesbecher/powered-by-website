
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const requestData = await req.json();
    console.log('Received request data:', requestData);

    const { phoneNumber, type } = requestData;

    if (!phoneNumber || !type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get the API key from environment variable
    const VOGENT_API_KEY = Deno.env.get('VOGENT_API_KEY');
    if (!VOGENT_API_KEY) {
      throw new Error('Missing Vogent API key');
    }

    // Room service flow ID
    const flowId = '04335230-e019-4a27-905f-2006d05768a1';

    console.log('Making Vogent API request with:', { phoneNumber, flowId });

    const response = await fetch('https://api.vogent.ai/api/dials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VOGENT_API_KEY}`,
      },
      body: JSON.stringify({
        toNumber: `+1${phoneNumber}`,
        callAgentId: flowId,
        fromNumberId: '53660ead-9260-4a23-8df2-55a7050b3340',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Vogent API error:', errorData);
      throw new Error(errorData.message || 'Failed to initiate call');
    }

    const data = await response.json();
    console.log('Vogent API response:', data);

    return new Response(
      JSON.stringify({ status: 'initiated' }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in initiate-call function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

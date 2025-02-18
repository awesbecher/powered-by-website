
import { serve } from "std/http/server.ts";

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
    const VOGENT_API_KEY = Deno.env.get('VOGENT_API_KEY');
    if (!VOGENT_API_KEY) {
      throw new Error('Missing Vogent API key');
    }

    const { phoneNumber, type, zipCode, productTypes } = await req.json();
    console.log('Received request:', { phoneNumber, type, zipCode, productTypes });

    if (!phoneNumber || !type) {
      throw new Error('Missing required fields');
    }

    // Prepare context for the insurance agent
    const context = {
      zipCode,
      productTypes: productTypes.join(', '),
    };

    console.log('Initiating call with context:', context);

    const response = await fetch('https://api.vogent.ai/api/dials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VOGENT_API_KEY}`,
      },
      body: JSON.stringify({
        phoneNumber: `+1${phoneNumber}`,
        flowId: 'insurance_quote_agent',
        context,
      }),
    });

    const data = await response.json();
    console.log('Vogent response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to initiate call');
    }

    if (!data.dial?.id) {
      throw new Error('No call ID received from Vogent');
    }

    return new Response(JSON.stringify({ 
      callId: data.dial.id,
      status: 'initiated'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in initiate-call function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

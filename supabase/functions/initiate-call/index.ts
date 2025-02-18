
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

    let body;
    try {
      body = await req.json();
      console.log('Received raw request body:', body);
    } catch (e) {
      console.error('Error parsing request body:', e);
      throw new Error('Invalid JSON in request body');
    }

    const { phoneNumber, type, zipCode, productTypes } = body;
    console.log('Parsed request data:', { phoneNumber, type, zipCode, productTypes });

    if (!phoneNumber || !type) {
      throw new Error('Missing required fields');
    }

    // Determine flow ID and context based on type
    let flowId: string;
    let context: Record<string, any> = {};

    if (type === 'insurance_quote') {
      flowId = 'madrone_insurance_quote_agent';
      context = {
        zipCode,
        productTypes: productTypes?.join(', '),
      };
    } else if (type === 'room_service') {
      flowId = '04335230-e019-4a27-905f-2006d05768a1';
      context = {};
    } else {
      throw new Error('Invalid call type');
    }

    console.log('Initiating call with context:', { flowId, context });

    const response = await fetch('https://api.vogent.ai/api/dials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VOGENT_API_KEY}`,
      },
      body: JSON.stringify({
        phoneNumber: `+1${phoneNumber}`,
        flowId,
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
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

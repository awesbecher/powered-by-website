
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
    console.log('Request method:', req.method);
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));

    const VOGENT_API_KEY = Deno.env.get('VOGENT_API_KEY');
    if (!VOGENT_API_KEY) {
      throw new Error('Missing Vogent API key');
    }

    let body;
    try {
      body = await req.json();
      console.log('Request body:', body);
    } catch (e) {
      console.error('Error parsing request JSON:', e);
      return new Response(JSON.stringify({ 
        error: 'Invalid JSON in request body'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const { phoneNumber, type, zipCode, productTypes } = body;

    if (!phoneNumber || !type) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
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
      return new Response(JSON.stringify({ 
        error: 'Invalid call type'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const vogentPayload = {
      phoneNumber: `+1${phoneNumber}`,
      flowId,
      context,
    };
    
    console.log('Making Vogent API request:', vogentPayload);

    const response = await fetch('https://api.vogent.ai/api/dials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VOGENT_API_KEY}`,
      },
      body: JSON.stringify(vogentPayload),
    });

    const data = await response.json();
    console.log('Vogent API response:', data);

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

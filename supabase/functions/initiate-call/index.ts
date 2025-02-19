
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const VOGENT_INSURANCE_API_KEY = Deno.env.get('VOGENT_INSURANCE_API_KEY')
const VOGENT_API_KEY = Deno.env.get('VOGENT_API_KEY')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { phoneNumber, type, metadata } = await req.json()
    
    console.log('Received request:', { type, phoneNumber, metadata });
    
    let apiKey = type === 'insurance' ? VOGENT_INSURANCE_API_KEY : VOGENT_API_KEY;
    let agentId = type === 'insurance' 
      ? 'fc25b8cc-c3a5-44f7-9b87-37b0e6819534'
      : 'b79e025d-bb6c-4deb-99d5-a5f2f573c639';
    let flowId = type === 'insurance'
      ? '018d6c31-37f7-7000-4a55-711c32d0587c'
      : '15b75020-90a0-473a-b6bc-758ced586c6b';

    console.log('Using configuration:', { type, agentId, flowId, hasApiKey: !!apiKey });

    if (!apiKey) {
      throw new Error(`API key not found for ${type} type. Please ensure VOGENT_API_KEY is set in Supabase secrets.`)
    }

    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    // Clean phone number to ensure proper format
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    if (cleanedPhoneNumber.length < 10) {
      throw new Error('Invalid phone number format. Must be at least 10 digits.')
    }

    console.log('Making request to Vogent API...');
    
    const requestBody = {
      phoneNumber: cleanedPhoneNumber,
      agentId,
      flowId,
      metadata
    };
    
    console.log('Request body:', requestBody);

    const response = await fetch('https://api.vogent.com/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify(requestBody)
    })

    const responseText = await response.text()
    console.log('Vogent API raw response:', responseText);
    
    let responseData;
    try {
      responseData = responseText ? JSON.parse(responseText) : {}
    } catch (e) {
      console.error('Error parsing response:', e);
      throw new Error(`Invalid response from Vogent API: ${responseText}`)
    }

    if (!response.ok) {
      console.error('Vogent API error response:', response.status, responseData);
      throw new Error(`Vogent API error: ${response.status} ${response.statusText} - ${JSON.stringify(responseData)}`)
    }

    console.log('Call successfully initiated:', responseData);
    
    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in initiate-call function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

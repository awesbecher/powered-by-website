
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const VOGENT_API_KEY = Deno.env.get('VOGENT_API_KEY')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { phoneNumber, type, metadata } = await req.json()
    
    console.log('Received request:', { type, phoneNumber, metadata });
    
    // Use a single API key and simpler configuration
    const config = {
      license: {
        agentId: 'b79e025d-bb6c-4deb-99d5-a5f2f573c639',
        flowId: '15b75020-90a0-473a-b6bc-758ced586c6b'
      },
      insurance: {
        agentId: 'fc25b8cc-c3a5-44f7-9b87-37b0e6819534',
        flowId: '018d6c31-37f7-7000-4a55-711c32d0587c'
      }
    }

    const settings = config[type as keyof typeof config]
    if (!settings) {
      throw new Error(`Invalid call type: ${type}`)
    }

    console.log('Using configuration:', { type, ...settings, hasApiKey: !!VOGENT_API_KEY });

    if (!VOGENT_API_KEY) {
      throw new Error('VOGENT_API_KEY is not set in environment variables')
    }

    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    // Clean phone number to ensure proper format
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    if (cleanedPhoneNumber.length < 10) {
      throw new Error('Invalid phone number format. Must be at least 10 digits.')
    }

    const requestBody = {
      phoneNumber: cleanedPhoneNumber,
      agentId: settings.agentId,
      flowId: settings.flowId,
      metadata
    };

    console.log('Making request to Vogent API with body:', requestBody);

    const response = await fetch('https://api.vogent.com/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': VOGENT_API_KEY,
      },
      body: JSON.stringify(requestBody)
    })

    const responseText = await response.text()
    console.log('Vogent API response status:', response.status);
    console.log('Vogent API raw response:', responseText);

    if (!response.ok) {
      throw new Error(`Vogent API error: ${response.status} - ${responseText}`)
    }

    const responseData = responseText ? JSON.parse(responseText) : {};
    console.log('Call successfully initiated:', responseData);

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
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

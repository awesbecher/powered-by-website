
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
    
    let apiKey = VOGENT_API_KEY
    let agentId = ''
    let flowId = ''
    
    // Set configuration based on call type
    if (type === 'insurance') {
      apiKey = VOGENT_INSURANCE_API_KEY
      agentId = 'fc25b8cc-c3a5-44f7-9b87-37b0e6819534'
      flowId = '018d6c31-37f7-7000-4a55-711c32d0587c'
    } else if (type === 'license') {
      agentId = 'b79e025d-bb6c-4deb-99d5-a5f2f573c639'
      flowId = '15b75020-90a0-473a-b6bc-758ced586c6b'
    }

    if (!flowId) {
      throw new Error('Flow ID not configured for this call type')
    }

    if (!apiKey) {
      throw new Error(`API key not found for ${type} type`)
    }

    console.log('Using configuration:', { type, agentId, flowId });

    const response = await fetch('https://api.vogent.com/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify({
        phoneNumber,
        agentId,
        flowId,
        metadata
      }),
    })

    const responseData = await response.text()
    console.log('Vogent API response:', response.status, responseData)

    if (!response.ok) {
      throw new Error(`Failed to initiate call: ${response.status} ${response.statusText} - ${responseData}`)
    }

    const data = responseData ? JSON.parse(responseData) : {}
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in initiate-call function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

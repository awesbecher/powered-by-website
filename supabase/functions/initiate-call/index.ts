
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const {
      phoneNumber,
      type,
      flowId,
      agentId,
      from,
      metadata
    } = await req.json()

    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    // Log the incoming request
    console.log('Initiating call with params:', {
      phoneNumber,
      type,
      flowId,
      agentId,
      from,
      metadata
    })

    // Configure the API based on call type
    const apiKey = Deno.env.get('VOGENT_API_KEY')
    if (!apiKey) {
      throw new Error('VOGENT_API_KEY is not configured')
    }

    // Prepare request body based on call type
    const requestBody: any = {
      phone_number: phoneNumber,
      flow_id: flowId,
      agent_id: agentId,
      from: from,
      metadata: metadata || {}
    }

    // Make request to Vogent API
    const response = await fetch('https://api.vogent.io/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    })

    const data = await response.json()
    console.log('Vogent API response:', data)

    if (!response.ok) {
      throw new Error(data.message || 'Failed to initiate call')
    }

    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})

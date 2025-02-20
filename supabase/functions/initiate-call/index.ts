
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

    console.log('Received request with params:', {
      phoneNumber,
      type,
      flowId,
      agentId,
      from,
      metadata
    })

    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    // Format phone number to E.164 format
    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber}`
    const formattedFrom = from.startsWith('+') ? from : `+1${from}`

    // Get API key from environment
    const apiKey = Deno.env.get('VOGENT_API_KEY')
    if (!apiKey) {
      console.error('VOGENT_API_KEY not found in environment')
      throw new Error('VOGENT_API_KEY is not configured')
    }

    console.log('Using Vogent API key:', apiKey.substring(0, 5) + '...')

    // Prepare request body for Vogent API
    const requestBody = {
      phone_number: formattedPhoneNumber,
      flow_id: flowId,
      agent_id: agentId,
      from: formattedFrom,
      metadata: metadata || {}
    }

    console.log('Sending request to Vogent API:', requestBody)

    // Make request to Vogent API with correct endpoint
    const response = await fetch('https://api.vogent.ai/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    const responseText = await response.text()
    console.log('Raw Vogent API response:', responseText)
    
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error('Failed to parse Vogent API response:', e)
      throw new Error('Invalid response from Vogent API')
    }

    if (!response.ok) {
      console.error('Vogent API error:', data)
      throw new Error(data.message || 'Failed to initiate call')
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (error) {
    console.error('Error in edge function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unknown error occurred',
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 // Changed to 500 for server errors
      }
    )
  }
})


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
    // Log the start of the request
    console.log('Starting initiate-call function')

    const { phoneNumber, type, flowId, agentId, from, metadata } = await req.json()
    
    console.log('Received request with payload:', { phoneNumber, type, flowId, agentId, from, metadata })

    // Validate phone number
    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    // Clean phone number to ensure proper format
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '')
    if (cleanedPhoneNumber.length < 10) {
      throw new Error('Invalid phone number format. Must be at least 10 digits.')
    }

    // Validate API key
    if (!VOGENT_API_KEY) {
      console.error('VOGENT_API_KEY is not set')
      throw new Error('VOGENT_API_KEY is not set in environment variables')
    }

    console.log('Making request to Vogent API with body:', JSON.stringify({
      phoneNumber: cleanedPhoneNumber,
      agentId,
      flowId,
      from,
      metadata
    }))

    const response = await fetch('https://api.vogent.com/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': VOGENT_API_KEY,
      },
      body: JSON.stringify({
        phoneNumber: cleanedPhoneNumber,
        agentId,
        flowId,
        from,
        metadata
      })
    })

    const responseText = await response.text()
    console.log('Vogent API response status:', response.status)
    console.log('Vogent API raw response:', responseText)

    if (!response.ok) {
      throw new Error(`Vogent API error: ${response.status} - ${responseText}`)
    }

    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch (e) {
      throw new Error(`Invalid JSON response from Vogent API: ${responseText}`)
    }

    console.log('Call successfully initiated:', responseData)

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    console.error('Error in initiate-call function:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

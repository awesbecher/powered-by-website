
import { serve } from "std/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const AGENT_ID = "cd922dc9-eea6-4b43-878f-cb5cfd67e005";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { phoneNumber, type } = await req.json()
    console.log('Initiating call for:', { phoneNumber, type })

    const apiKey = Deno.env.get('VOGENT_API_KEY')
    if (!apiKey) {
      throw new Error('Vogent API key is not configured')
    }

    // Clean phone number (remove any non-digits)
    const cleanNumber = phoneNumber.replace(/\D/g, '')
    if (cleanNumber.length !== 10) {
      throw new Error('Invalid phone number format. Must be 10 digits.')
    }

    // Call Vogent API to initiate the call
    const response = await fetch('https://api.vogent.ai/v1/dial', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: `+1${cleanNumber}`, // Adding US country code
        agent_id: AGENT_ID,  // Using the fixed agent ID
        agent: type || 'room_service'  // Using the agent type passed from frontend
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Vogent API error:', error)
      throw new Error(`API error: ${error}`)
    }

    const result = await response.json()
    console.log('Call initiated successfully:', result)

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

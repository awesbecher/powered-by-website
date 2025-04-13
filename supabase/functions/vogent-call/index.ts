
import { corsHeaders } from '../_shared/cors.ts'

interface RequestBody {
  phoneNumber: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { phoneNumber } = await req.json() as RequestBody;
    
    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    console.log('Initiating call to phone number:', phoneNumber)

    const response = await fetch('https://api.vogent.ai/api/dials', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer elto_fvRkQ2V9PYDyDpdxK9kGMCpJLqESEJiH',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: "bcdfcfef-6f02-483b-a10e-f0e85d341414",
        toNumber: phoneNumber,
        fromNumberId: "53660ead-9260-4a23-8df2-55a7050b3340",
        // Using the specified Assistant ID for the real estate agent
        callAgentId: "c1c80d2e-6b65-4172-9f6b-09177b9e54f1"
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Vogent API error:', errorData)
      throw new Error(`Vogent API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Call initiated successfully:', data)

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Error:', error.message)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

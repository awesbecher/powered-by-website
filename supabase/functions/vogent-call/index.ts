
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
    const { phoneNumber } = await req.json()
    
    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    console.log('Initiating call to:', phoneNumber)

    const response = await fetch('https://api.vogent.ai/api/dials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer elto_fvRkQ2V9PYDyDpdxK9kGMCpJLqESEJiH',
      },
      body: JSON.stringify({
        agent_id: "cd922dc9-eea6-4b43-878f-cb5cfd67e005",
        toNumber: phoneNumber,
        fromNumberId: "53660ead-9260-4a23-8df2-55a7050b3340",
        callAgentId: "cd922dc9-eea6-4b43-878f-cb5cfd67e005"
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Vogent API error:', errorData)
      throw new Error(`Vogent API error: ${errorData.message || 'Unknown error'}`)
    }

    const data = await response.json()
    console.log('Call initiated successfully:', data)

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in vogent-call function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to initiate call'
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})


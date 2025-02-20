
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { phoneNumber } = await req.json()
    
    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    console.log('Initiating call to:', phoneNumber)

    const vogentKey = Deno.env.get('VOGENT_API_KEY')
    if (!vogentKey) {
      throw new Error('VOGENT_API_KEY is not configured')
    }

    const response = await fetch('https://api.vogent.com/v1/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${vogentKey}`,
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        agent_id: 'room_service_agent', // Add your specific agent ID here
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

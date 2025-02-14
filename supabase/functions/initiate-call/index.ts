
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

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
    // Log the incoming request
    const requestBody = await req.json()
    console.log('Incoming request body:', requestBody)
    
    const { phoneNumber, type } = requestBody

    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    // Clean the phone number to remove any non-numeric characters
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '')
    console.log('Cleaned phone number:', cleanPhoneNumber)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Create a record in the outbound_calls table
    const { data: callRecord, error: dbError } = await supabaseClient
      .from('outbound_calls')
      .insert({
        phone_number: cleanPhoneNumber,
        call_type: type || 'room_service',
        status: 'pending'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error(`Database error: ${dbError.message}`)
    }

    console.log('Successfully created call record:', callRecord)

    // Get and validate API key
    const apiKey = Deno.env.get('MADRONE_API_KEY')
    if (!apiKey) {
      throw new Error('MADRONE_API_KEY is not configured')
    }
    console.log('API Key present and length:', apiKey.length)

    try {
      // Make the API call to initiate the phone call
      const response = await fetch('https://api.madrone.ai/v1/calls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          to: cleanPhoneNumber,
          type: type || 'room_service',
          country_code: "1"
        })
      })

      const responseData = await response.json()
      console.log('API response status:', response.status)
      console.log('API response body:', responseData)

      if (!response.ok) {
        await supabaseClient
          .from('outbound_calls')
          .update({ status: 'failed' })
          .eq('id', callRecord.id)

        throw new Error(`API error (${response.status}): ${JSON.stringify(responseData)}`)
      }

      // Update call record status to success
      await supabaseClient
        .from('outbound_calls')
        .update({ status: 'success' })
        .eq('id', callRecord.id)

      return new Response(
        JSON.stringify({ success: true, callId: callRecord.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (fetchError) {
      console.error('Fetch error:', fetchError)
      
      // Update call record status to failed
      await supabaseClient
        .from('outbound_calls')
        .update({ status: 'failed' })
        .eq('id', callRecord.id)

      throw new Error(`API error: ${fetchError.message}`)
    }
  } catch (error) {
    console.error('Error in initiate-call function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})


import { serve } from "std/http/server.ts"
import { createClient } from '@supabase/supabase-js'

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
    // Get the API key - using the correct secret name
    const apiKey = Deno.env.get('Madrone API')
    if (!apiKey) {
      throw new Error('Madrone API key is not configured')
    }

    const { phoneNumber, type } = await req.json()
    
    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    // Clean the phone number
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '')

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration is missing')
    }

    const supabaseClient = createClient(supabaseUrl, supabaseKey)

    console.log('Attempting to create call record for:', cleanPhoneNumber);

    // Create a record in outbound_calls
    const { data: callRecord, error: dbError } = await supabaseClient
      .from('outbound_calls')
      .insert({
        phone_number: cleanPhoneNumber,
        call_type: type || 'room_service',
        status: 'initiated'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Database error: ${dbError.message}`)
    }

    console.log('Call record created:', callRecord);
    console.log('Making API call to Madrone...');

    // Make the API call to Madrone
    const response = await fetch('https://api.madrone.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: cleanPhoneNumber,
        type: type || 'room_service',
        country_code: "1"  // US country code
      })
    })

    // Get the response data
    const responseData = await response.text()
    console.log('Madrone API response:', responseData);
    
    let parsedResponse
    try {
      parsedResponse = JSON.parse(responseData)
    } catch {
      parsedResponse = { rawResponse: responseData }
    }

    if (!response.ok) {
      console.error('Madrone API error:', parsedResponse);
      // Update call record to failed status
      await supabaseClient
        .from('outbound_calls')
        .update({ 
          status: 'failed',
          error_details: parsedResponse,
          updated_at: new Date().toISOString()
        })
        .eq('id', callRecord.id)

      throw new Error(`API error: ${JSON.stringify(parsedResponse)}`)
    }

    console.log('Call initiated successfully');

    // Update call record to success status
    await supabaseClient
      .from('outbound_calls')
      .update({ 
        status: 'success',
        updated_at: new Date().toISOString()
      })
      .eq('id', callRecord.id)

    return new Response(
      JSON.stringify({ success: true, data: parsedResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({
        error: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

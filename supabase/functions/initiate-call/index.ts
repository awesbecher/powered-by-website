
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
    // Get and validate API key first thing
    const apiKey = Deno.env.get('MADRONE_API_KEY')
    if (!apiKey) {
      console.error('MADRONE_API_KEY is missing')
      throw new Error('MADRONE_API_KEY is not configured')
    }

    // Log API key presence without exposing the actual key
    console.log('API Key validation:', {
      exists: !!apiKey,
      length: apiKey.length,
      firstThreeChars: apiKey.slice(0, 3),
      lastThreeChars: apiKey.slice(-3)
    })

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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration is missing')
    }

    const supabaseClient = createClient(supabaseUrl, supabaseKey)

    try {
      // Create the request payload
      const payload = {
        to: cleanPhoneNumber,
        type: type || 'room_service',
        country_code: "1"
      }

      // Create a record in the outbound_calls table before making the API call
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
        console.error('Database error:', dbError)
        throw new Error(`Database error: ${dbError.message}`)
      }

      console.log('Created call record:', callRecord)

      // Set up headers for Madrone API call
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      }

      // Log the request details (safely)
      console.log('Preparing Madrone API request:', {
        url: 'https://api.madrone.ai/v1/calls',
        method: 'POST',
        headers: {
          ...headers,
          'Authorization': `Bearer ${apiKey.slice(0, 3)}...${apiKey.slice(-3)}` // Log partial key for safety
        },
        payload
      })

      try {
        // Make the API call with error handling
        const response = await fetch('https://api.madrone.ai/v1/calls', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        })

        // Get the raw response text first
        const responseText = await response.text()
        console.log('Madrone API raw response:', responseText)

        // Try to parse the response as JSON
        let responseData
        try {
          responseData = JSON.parse(responseText)
          console.log('Madrone API parsed response:', responseData)
        } catch (e) {
          console.error('Failed to parse Madrone API response:', e)
          responseData = { error: responseText }
        }

        if (!response.ok) {
          // Update call record status to failed
          await supabaseClient
            .from('outbound_calls')
            .update({ 
              status: 'failed',
              error_details: {
                status: response.status,
                statusText: response.statusText,
                response: responseData
              },
              updated_at: new Date().toISOString()
            })
            .eq('id', callRecord.id)

          throw new Error(`Madrone API error (${response.status}): ${JSON.stringify(responseData)}`)
        }

        // Update call record status to success
        await supabaseClient
          .from('outbound_calls')
          .update({ 
            status: 'success',
            updated_at: new Date().toISOString()
          })
          .eq('id', callRecord.id)

        return new Response(
          JSON.stringify({ 
            success: true, 
            callId: callRecord.id,
            response: responseData 
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        )
      } catch (fetchError) {
        // Log the detailed fetch error
        console.error('Fetch error details:', {
          name: fetchError.name,
          message: fetchError.message,
          cause: fetchError.cause,
          stack: fetchError.stack
        })

        // Update call record with fetch error details
        await supabaseClient
          .from('outbound_calls')
          .update({ 
            status: 'failed',
            error_details: {
              error: fetchError.message,
              stack: fetchError.stack,
              cause: fetchError.cause
            },
            updated_at: new Date().toISOString()
          })
          .eq('id', callRecord.id)

        throw fetchError
      }
    } catch (apiError) {
      console.error('API error details:', {
        name: apiError.name,
        message: apiError.message,
        stack: apiError.stack
      })
      throw apiError
    }
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error instanceof Error ? error.stack : undefined 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

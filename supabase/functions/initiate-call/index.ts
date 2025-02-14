
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
    // Get and validate the API key
    const apiKey = Deno.env.get('MADRONE_API_KEY')
    if (!apiKey) {
      console.error('Madrone API key is not configured');
      throw new Error('Madrone API key is not configured')
    }

    const { phoneNumber, type } = await req.json()
    
    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    // Clean the phone number and ensure it's in the correct format
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '')
    if (cleanPhoneNumber.length !== 10) {
      throw new Error('Invalid phone number format. Must be 10 digits.')
    }
    
    console.log('Request details:', {
      cleanPhoneNumber,
      type: type || 'room_service',
      apiKeyExists: !!apiKey,
    });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration is missing')
    }

    const supabaseClient = createClient(supabaseUrl, supabaseKey)

    // Create initial call record
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

    // Prepare request payload for Madrone API
    const payload = {
      to: cleanPhoneNumber,
      type: type || 'room_service',
      country_code: "1"  // US country code
    };
    
    console.log('Attempting Madrone API request with payload:', payload);

    // Make the API call to Madrone with improved error handling
    try {
      const response = await fetch('https://api.madrone.ai/v1/calls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('Madrone API response status:', response.status);
      
      const responseText = await response.text();
      console.log('Raw Madrone API response:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse Madrone API response:', e);
        responseData = { error: 'Invalid JSON response', raw: responseText };
      }

      if (!response.ok) {
        console.error('Madrone API error:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });

        // Update call record with error details
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
          .eq('id', callRecord.id);

        throw new Error(`Madrone API error: ${JSON.stringify(responseData)}`);
      }

      // Update call record to success
      await supabaseClient
        .from('outbound_calls')
        .update({ 
          status: 'success',
          updated_at: new Date().toISOString()
        })
        .eq('id', callRecord.id);

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: responseData,
          call_id: callRecord.id 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );

    } catch (apiError) {
      console.error('Madrone API call error:', apiError);
      
      // Update call record with error
      await supabaseClient
        .from('outbound_calls')
        .update({ 
          status: 'failed',
          error_details: { 
            error: apiError.message,
            type: apiError.name
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', callRecord.id);

      throw apiError;
    }

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        type: error.name
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

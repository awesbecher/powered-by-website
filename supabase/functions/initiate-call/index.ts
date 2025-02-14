
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
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);
    if (!apiKey) {
      throw new Error('Madrone API key is not configured')
    }

    const { phoneNumber, type } = await req.json()
    
    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    // Clean the phone number
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '')
    if (cleanPhoneNumber.length !== 10) {
      throw new Error('Invalid phone number format. Must be 10 digits.')
    }

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

    // First validate we can reach the API
    console.log('Attempting health check...');
    try {
      const validateResponse = await fetch('https://api.madrone.ai/v1/health', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        }
      });
      
      console.log('Health check response:', {
        status: validateResponse.status,
        ok: validateResponse.ok,
        statusText: validateResponse.statusText
      });

      if (!validateResponse.ok) {
        const healthCheckText = await validateResponse.text();
        console.error('Health check failed:', healthCheckText);
        throw new Error(`Health check failed with status ${validateResponse.status}`);
      }
    } catch (healthError) {
      console.error('Health check error:', healthError);
      throw new Error(`Failed to reach Madrone API: ${healthError.message}`);
    }

    console.log('Health check passed, making API call...');

    // Prepare request payload
    const payload = {
      to: cleanPhoneNumber,
      type: type || 'room_service',
      country_code: "1"  // US country code
    };

    console.log('Making request to Madrone API with payload:', payload);
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json'
    };

    console.log('Making request to Madrone API with headers:', {
      ...headers,
      'Authorization': `Bearer ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` // Log partial key for debugging
    });

    // Make the API call to Madrone with improved error handling
    let response;
    try {
      response = await fetch('https://api.madrone.ai/v1/calls', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
    } catch (fetchError) {
      console.error('Network error during fetch:', fetchError);
      throw new Error(`Network error: ${fetchError.message}`);
    }

    console.log('Madrone API Response Status:', response.status);
    console.log('Madrone API Response Status Text:', response.statusText);
    
    const responseText = await response.text();
    console.log('Madrone API Raw Response:', responseText);
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('Parsed Response Data:', responseData);
    } catch (e) {
      console.error('Failed to parse response:', e);
      responseData = { error: 'Invalid JSON response', raw: responseText };
    }

    if (!response.ok) {
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

    // Success case - update the call record
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

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        type: error.name,
        details: error.stack
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

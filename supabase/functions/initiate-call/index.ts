
import { serve } from "std/http/server.ts"
import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://8cc87c67-4a57-4d06-9e12-7f96ed3d254a.lovableproject.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
}

// Validate and clean phone number
const validatePhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) {
    throw new Error('Phone number is required')
  }
  const cleanNumber = phoneNumber.replace(/\D/g, '')
  if (cleanNumber.length !== 10) {
    throw new Error('Invalid phone number format. Must be 10 digits.')
  }
  return cleanNumber
}

// Initialize Supabase client
const initSupabaseClient = () => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration is missing')
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Create initial call record
const createCallRecord = async (supabaseClient: any, phoneNumber: string, type: string) => {
  const { data, error } = await supabaseClient
    .from('outbound_calls')
    .insert({
      phone_number: phoneNumber,
      call_type: type || 'room_service',
      status: 'initiated'
    })
    .select()
    .single()

  if (error) {
    console.error('Database error:', error)
    throw new Error(`Database error: ${error.message}`)
  }

  return data
}

// Check Madrone API health
const checkMadroneHealth = async (apiKey: string) => {
  console.log('Attempting health check...')
  try {
    const response = await fetch('https://api.madrone.ai/v1/health', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    })
    
    console.log('Health check response:', {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    })

    if (!response.ok) {
      const healthCheckText = await response.text()
      console.error('Health check failed:', healthCheckText)
      throw new Error(`Health check failed with status ${response.status}`)
    }
  } catch (error) {
    console.error('Health check error:', error)
    throw new Error(`Failed to reach Madrone API: ${error.message}`)
  }
}

// Make call to Madrone API
const initiateCall = async (apiKey: string, phoneNumber: string, type: string) => {
  const payload = {
    to: phoneNumber,
    type: type || 'room_service',
    country_code: "1"
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json'
  }

  console.log('Making request to Madrone API with payload:', payload)
  console.log('Making request with headers:', {
    ...headers,
    'Authorization': 'Bearer [REDACTED]'
  })

  try {
    const response = await fetch('https://api.madrone.ai/v1/calls', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })

    console.log('Madrone API Response Status:', response.status)
    console.log('Madrone API Response Status Text:', response.statusText)
    
    const responseText = await response.text()
    console.log('Madrone API Raw Response:', responseText)
    
    if (!response.ok) {
      throw new Error(`Madrone API returned status ${response.status}: ${responseText}`)
    }
    
    try {
      return JSON.parse(responseText)
    } catch (e) {
      console.error('Failed to parse response:', e)
      throw new Error(`Invalid JSON response: ${responseText}`)
    }
  } catch (error) {
    console.error('Error calling Madrone API:', error)
    throw error
  }
}

// Update call record status
const updateCallRecord = async (supabaseClient: any, callId: string, status: string, errorDetails?: any) => {
  const updateData = {
    status,
    updated_at: new Date().toISOString(),
    ...(errorDetails && { error_details: errorDetails })
  }

  const { error } = await supabaseClient
    .from('outbound_calls')
    .update(updateData)
    .eq('id', callId)

  if (error) {
    console.error('Error updating call record:', error)
    throw new Error(`Failed to update call record: ${error.message}`)
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    })
  }

  try {
    const apiKey = Deno.env.get('MADRONE_API_KEY')
    if (!apiKey) {
      throw new Error('Madrone API key is not configured')
    }

    const { phoneNumber, type } = await req.json()
    const cleanPhoneNumber = validatePhoneNumber(phoneNumber)
    const supabaseClient = initSupabaseClient()
    
    // Create initial call record
    const callRecord = await createCallRecord(supabaseClient, cleanPhoneNumber, type)
    
    try {
      // Check API health
      await checkMadroneHealth(apiKey)
      
      // Make the call
      const responseData = await initiateCall(apiKey, cleanPhoneNumber, type)
      
      // Update success status
      await updateCallRecord(supabaseClient, callRecord.id, 'success')

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: responseData,
          call_id: callRecord.id 
        }),
        { 
          status: 200,
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (error) {
      // Update the call record with failure status
      await updateCallRecord(supabaseClient, callRecord.id, 'failed', {
        error: error.message
      })
      throw error
    }
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
        type: error.name,
        details: error.stack
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        }
      }
    )
  }
})


import { serve } from "std/http/server.ts"
import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
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

// Check Madrone API health with detailed error logging
const checkMadroneHealth = async (apiKey: string) => {
  console.log('Starting health check for Madrone API...')
  
  try {
    console.log('Making health check request...')
    const response = await fetch('https://api.madrone.ai/v1/health', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    console.log('Health check response received:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    })

    const responseText = await response.text()
    console.log('Health check response body:', responseText)

    if (!response.ok) {
      throw new Error(`Health check failed with status ${response.status}: ${responseText}`)
    }

    return true
  } catch (error) {
    console.error('Detailed health check error:', {
      name: error.name,
      message: error.message,
      cause: error.cause,
      stack: error.stack
    })
    throw error
  }
}

// Make call to Madrone API with enhanced error handling
const initiateCall = async (apiKey: string, phoneNumber: string, type: string) => {
  console.log('Starting call initiation process...')
  
  const payload = {
    to: phoneNumber,
    type: type || 'room_service',
    country_code: "1"
  }

  console.log('Request payload:', payload)

  try {
    console.log('Making API request...')
    const response = await fetch('https://api.madrone.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    console.log('Response received:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    })

    const responseText = await response.text()
    console.log('Response body:', responseText)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${responseText}`)
    }

    try {
      return JSON.parse(responseText)
    } catch (e) {
      console.error('JSON parse error:', e)
      throw new Error(`Invalid JSON response: ${responseText}`)
    }
  } catch (error) {
    console.error('Detailed API error:', {
      name: error.name,
      message: error.message,
      cause: error.cause,
      stack: error.stack
    })
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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    })
  }

  try {
    console.log('Starting request processing...')
    
    const apiKey = Deno.env.get('MADRONE_API_KEY')
    if (!apiKey) {
      console.error('Madrone API key not found')
      throw new Error('Madrone API key is not configured')
    }
    console.log('API key found')

    const { phoneNumber, type } = await req.json()
    console.log('Request body parsed:', { phoneNumber, type })

    const cleanPhoneNumber = validatePhoneNumber(phoneNumber)
    console.log('Phone number validated:', cleanPhoneNumber)

    const supabaseClient = initSupabaseClient()
    console.log('Supabase client initialized')
    
    // Create initial call record
    const callRecord = await createCallRecord(supabaseClient, cleanPhoneNumber, type)
    console.log('Call record created:', callRecord)
    
    try {
      // Check API health
      console.log('Checking Madrone API health...')
      await checkMadroneHealth(apiKey)
      console.log('Health check passed')
      
      // Make the call
      console.log('Initiating call...')
      const responseData = await initiateCall(apiKey, cleanPhoneNumber, type)
      console.log('Call initiated successfully:', responseData)
      
      // Update success status
      await updateCallRecord(supabaseClient, callRecord.id, 'success')
      console.log('Call record updated with success status')

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
      console.error('Operation failed:', error)
      // Update the call record with failure status
      await updateCallRecord(supabaseClient, callRecord.id, 'failed', {
        error: error.message,
        timestamp: new Date().toISOString()
      })
      throw error
    }
  } catch (error) {
    console.error('Function error:', {
      name: error.name,
      message: error.message,
      cause: error.cause,
      stack: error.stack
    })
    
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


import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const { secretName } = await req.json()
    
    if (!secretName) {
      console.error('No secret name provided')
      throw new Error('Secret name is required')
    }

    console.log(`Looking up secret: ${secretName}`)

    // Get the secret value from Deno environment
    const secretValue = Deno.env.get(secretName)
    
    if (!secretValue) {
      console.error(`Secret ${secretName} not found in environment variables`)
      throw new Error(`Secret ${secretName} not found`)
    }

    console.log('Secret retrieved successfully')
    
    return new Response(
      JSON.stringify({ 
        secret: secretValue,
        message: 'Secret retrieved successfully'
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in get-secret function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500,
      }
    )
  }
})

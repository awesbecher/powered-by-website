
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
    const { secretName } = await req.json()
    
    if (!secretName) {
      throw new Error('Secret name is required')
    }

    console.log(`Looking up secret: ${secretName}`)

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing required environment variables')
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabaseAdmin
      .from('secrets')
      .select('value')
      .eq('name', secretName)
      .maybeSingle()

    if (error) {
      console.error('Database error:', error)
      throw new Error('Failed to fetch secret from database')
    }

    if (!data) {
      console.error('Secret not found:', secretName)
      throw new Error(`Secret ${secretName} not found`)
    }

    console.log('Secret retrieved successfully')
    return new Response(
      JSON.stringify({ 
        secret: data.value,
        message: 'Secret retrieved successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

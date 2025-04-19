
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const gcpApiKey = Deno.env.get('GCP_TTS_KEY')

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
    const { text, voice } = await req.json()
    
    if (!text) {
      throw new Error('Text input is required')
    }

    const response = await fetch(
      'https://your-cloud-endpoint.run.app/v1/tts',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${gcpApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to generate audio: ${response.statusText}`)
    }

    // Get the audio data as an ArrayBuffer
    const audioBuffer = await response.arrayBuffer()
    
    // Convert to base64 for safe transmission
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(audioBuffer))
    )

    return new Response(
      JSON.stringify({ 
        audio: base64Audio,
        format: 'audio/wav'
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error in gcp-tts function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    )
  }
})

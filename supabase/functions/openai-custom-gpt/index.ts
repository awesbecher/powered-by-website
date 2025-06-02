
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

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
    // Get the OpenAI API key from environment variables
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    
    if (!openaiApiKey) {
      console.error('OpenAI API key not configured in environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Configuration error: OpenAI API key is not set',
          details: 'Please set the OPENAI_API_KEY in Supabase secrets'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const { messages, model = "gpt-4o", temperature = 0.7, systemPrompt } = await req.json()
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request',
          details: 'Messages are required and must be an array'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Prepare the conversation array for the OpenAI API
    const conversation = []
    
    // Add system prompt if provided
    if (systemPrompt) {
      conversation.push({
        role: "system",
        content: systemPrompt
      })
    }
    
    // Add user messages
    conversation.push(...messages)

    console.log('Sending request to OpenAI with conversation:', JSON.stringify(conversation.slice(0, 2) + '... [truncated]'))

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: conversation,
        temperature: temperature,
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      
      return new Response(
        JSON.stringify({ 
          error: `OpenAI API error (${response.status})`,
          details: errorText
        }),
        {
          status: 502, // Gateway error - issue with upstream service
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const result = await response.json()
    console.log('OpenAI response received successfully')

    return new Response(
      JSON.stringify({
        message: result.choices[0].message,
        usage: result.usage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error in openai-custom-gpt function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request',
        details: error.toString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

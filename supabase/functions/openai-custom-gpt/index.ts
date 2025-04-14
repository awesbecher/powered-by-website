
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
      throw new Error('OpenAI API key not configured in environment variables')
    }

    const { messages, model = "gpt-4o", temperature = 0.7, systemPrompt } = await req.json()
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Messages are required and must be an array')
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

    console.log('Sending request to OpenAI with conversation:', JSON.stringify(conversation))

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
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`)
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
        error: error.message,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

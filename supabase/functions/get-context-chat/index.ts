
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
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('Missing OpenAI API Key')
    }

    const { context, messages } = await req.json()
    
    if (!context || !messages) {
      throw new Error('Missing required parameters')
    }

    // Prepare the messages array with context in the system message
    const systemMessage = {
      role: "system", 
      content: `Use the following context from the user's uploaded document to help answer their questions. If the answer cannot be found in the context, be honest about it.\n\nContext: ${context}`
    }
    
    // Filter out any system messages from the user input and add our own
    const userMessages = messages.filter(m => m.role !== "system")
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [systemMessage, ...userMessages],
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || response.status}`)
    }

    return new Response(
      JSON.stringify({ 
        reply: data.choices[0].message.content 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in get-context-chat function:', error.message)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

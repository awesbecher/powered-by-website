
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const FLOW_ID = "cd922dc9-eea6-4b43-878f-cb5cfd67e005";
const AGENT_ID = "53660ead-9260-4a23-8df2-55a7050b3340";
const AGENT_PHONE = "9177682024";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { phoneNumber } = await req.json()
    
    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }

    // Format phone number
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const formattedPhoneNumber = cleanNumber.length === 10 
      ? '+1' + cleanNumber
      : (cleanNumber.startsWith('1') ? '+' + cleanNumber : '+1' + cleanNumber);

    // Get API key from environment
    const apiKey = Deno.env.get('VOGENT_API_KEY')
    if (!apiKey) {
      throw new Error('Vogent API key not found')
    }

    const response = await fetch("https://api.vogent.ai/flow/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({
        flowId: FLOW_ID,
        agentId: AGENT_ID,
        webhookUrl: `${req.headers.get('origin')}/api/call-completed`,
        phoneNumber: formattedPhoneNumber,
        outboundNumber: AGENT_PHONE,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vogent API error:', response.status, errorText);
      throw new Error('Failed to initiate call');
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({ data, message: 'Call initiated successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in vogent-call function:', error);
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

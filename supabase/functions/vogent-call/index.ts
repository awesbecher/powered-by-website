
import { corsHeaders } from '../_shared/cors.ts'

interface RequestBody {
  phoneNumber: string;
  agentId?: string;
}

const DEFAULT_AGENT_CONFIG = {
  agent_id: "9ec7dc64-ca1e-4eaf-a54c-7942bf443bbc",
  fromNumberId: "53660ead-9260-4a23-8df2-55a7050b3340",
  callAgentId: "cd922dc9-eea6-4b43-878f-cb5cfd67e005"
};

const SALES_AGENT_CONFIG = {
  agent_id: "15b75020-90a0-473a-b6bc-758ced586c6b",
  fromNumberId: "53660ead-9260-4a23-8df2-55a7050b3340",
  callAgentId: "cd922dc9-eea6-4b43-878f-cb5cfd67e005"
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { phoneNumber, agentId } = await req.json() as RequestBody;
    
    if (!phoneNumber) {
      throw new Error('Phone number is required');
    }

    console.log('Initiating call to phone number:', phoneNumber);

    // Determine which agent configuration to use
    const config = agentId === SALES_AGENT_CONFIG.agent_id 
      ? SALES_AGENT_CONFIG 
      : DEFAULT_AGENT_CONFIG;

    const response = await fetch('https://api.vogent.ai/api/dials', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('VOGENT_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...config,
        toNumber: phoneNumber,
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Vogent API error:', errorData);
      throw new Error(`Vogent API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Call initiated successfully:', data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

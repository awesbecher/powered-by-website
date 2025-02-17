
import { serve } from "std/server";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SmsRequest {
  to: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
    const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      console.error('Missing Twilio credentials');
      throw new Error('Missing Twilio credentials');
    }

    const { to, message } = await req.json() as SmsRequest;
    console.log('Received SMS request:', { to, message });

    if (!to || !message) {
      throw new Error('Missing required fields');
    }

    // Ensure phone number is in E.164 format
    const formattedPhone = to.startsWith('+') ? to : `+${to}`;
    console.log('Formatted phone number:', formattedPhone);

    const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    
    const formData = new URLSearchParams();
    formData.append('To', formattedPhone);
    formData.append('From', '+18447162733'); // Twilio phone number
    formData.append('Body', message);

    console.log('Sending request to Twilio...');

    const response = await fetch(twilioEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
      },
      body: formData.toString(),
    });

    const data = await response.json();
    console.log('Twilio response:', data);

    if (!response.ok) {
      console.error('Twilio error:', data);
      throw new Error(data.message || 'Failed to send SMS');
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in send-sms function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

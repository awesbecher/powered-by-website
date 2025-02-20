
import { supabase } from "@/integrations/supabase/client";

const FLOW_ID = "cd922dc9-eea6-4b43-878f-cb5cfd67e005";
const AGENT_ID = "53660ead-9260-4a23-8df2-55a7050b3340";
const AGENT_PHONE = "9177682024"; // Agent's phone number for outbound calling

export const initiateVogentCall = async (userPhoneNumber: string) => {
  try {
    console.log('Fetching Vogent API key from secrets...');
    const { data, error } = await supabase.functions.invoke('get-secret', {
      body: { secretName: 'VOGENT_API_KEY' }
    });

    if (error) {
      console.error('Error invoking get-secret function:', error);
      throw new Error(`Failed to get Vogent API key: ${error.message}`);
    }

    if (!data?.secret) {
      console.error('No secret data returned:', data);
      throw new Error('Vogent API key not found in response');
    }

    console.log('Initiating Vogent call...');
    const response = await fetch("https://api.vogent.ai/flow/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": data.secret,
      },
      body: JSON.stringify({
        flowId: FLOW_ID,
        agentId: AGENT_ID,
        webhookUrl: `${window.location.origin}/api/call-completed`,
        phoneNumber: userPhoneNumber.replace(/\D/g, ''),
        outboundNumber: AGENT_PHONE,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vogent API error response:', errorText);
      throw new Error(`Vogent API error (${response.status}): ${errorText}`);
    }

    const responseData = await response.json();
    console.log('Vogent call initiated successfully:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error in initiateVogentCall:', error);
    throw error;
  }
};

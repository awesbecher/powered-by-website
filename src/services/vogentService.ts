
import { supabase } from "@/integrations/supabase/client";

const FLOW_ID = "cd922dc9-eea6-4b43-878f-cb5cfd67e005";
const AGENT_ID = "53660ead-9260-4a23-8df2-55a7050b3340";
const AGENT_PHONE = "9177682024"; // Agent's phone number for outbound calling

export const initiateVogentCall = async (userPhoneNumber: string) => {
  try {
    console.log('Fetching Vogent API key from secrets...');
    const { data: secretData, error: secretError } = await supabase.functions.invoke('get-secret', {
      body: { secretName: 'VOGENT_API_KEY' }
    });

    if (secretError || !secretData?.secret) {
      console.error('Error getting Vogent API key:', secretError || 'No secret returned');
      throw new Error('Failed to retrieve Vogent API key');
    }

    // Format phone number to include country code
    const formattedPhoneNumber = userPhoneNumber.startsWith('+1') 
      ? userPhoneNumber 
      : '+1' + userPhoneNumber.replace(/\D/g, '');

    console.log('Initiating Vogent call to:', formattedPhoneNumber);
    
    const requestBody = {
      flowId: FLOW_ID,
      agentId: AGENT_ID,
      webhookUrl: `${window.location.origin}/api/call-completed`,
      phoneNumber: formattedPhoneNumber,
      outboundNumber: AGENT_PHONE,
    };

    console.log('Request body:', requestBody);

    const response = await fetch("https://api.vogent.ai/flow/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": secretData.secret,
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    console.log('Raw API response:', responseText);

    if (!response.ok) {
      throw new Error(`Vogent API error (${response.status}): ${responseText}`);
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      throw new Error('Invalid response from Vogent API');
    }

    console.log('Vogent call initiated successfully:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error in initiateVogentCall:', error);
    throw error;
  }
};

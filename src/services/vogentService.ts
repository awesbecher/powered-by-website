
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

    if (secretError) {
      console.error('Edge function error:', secretError);
      throw new Error('Failed to retrieve Vogent API key');
    }

    if (!secretData?.secret) {
      console.error('No API key found in response:', secretData);
      throw new Error('Vogent API key not found');
    }

    // Format phone number to include country code if not already present
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

    console.log('Making request to Vogent API with body:', JSON.stringify(requestBody));

    try {
      const response = await fetch("https://api.vogent.ai/flow/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": secretData.secret,
          "Accept": "application/json"
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();
      console.log('Raw API response:', responseText);

      if (!response.ok) {
        throw new Error(`Vogent API error (${response.status}): ${responseText}`);
      }

      try {
        const responseData = JSON.parse(responseText);
        console.log('Vogent call initiated successfully:', responseData);
        return responseData;
      } catch (e) {
        console.error('Error parsing JSON response:', e);
        throw new Error('Invalid response format from Vogent API');
      }
    } catch (apiError) {
      console.error('Vogent API call failed:', apiError);
      throw new Error(`Failed to initiate call: ${apiError.message}`);
    }
  } catch (error) {
    console.error('Error in initiateVogentCall:', error);
    throw error;
  }
};


import { supabase } from "@/integrations/supabase/client";

const FLOW_ID = "cd922dc9-eea6-4b43-878f-cb5cfd67e005";
const AGENT_ID = "53660ead-9260-4a23-8df2-55a7050b3340";
const AGENT_PHONE = "9177682024";

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

    // Ensure phone number is properly formatted with country code
    const cleanNumber = userPhoneNumber.replace(/\D/g, '');
    const formattedPhoneNumber = cleanNumber.length === 10 
      ? '+1' + cleanNumber
      : (cleanNumber.startsWith('1') ? '+' + cleanNumber : '+1' + cleanNumber);

    console.log('Initiating Vogent call to:', formattedPhoneNumber);

    // Create the request body
    const requestBody = JSON.stringify({
      flowId: FLOW_ID,
      agentId: AGENT_ID,
      webhookUrl: `${window.location.origin}/api/call-completed`,
      phoneNumber: formattedPhoneNumber,
      outboundNumber: AGENT_PHONE,
    });

    // Make the API call using URLSearchParams for better compatibility
    const response = await fetch("https://api.vogent.ai/flow/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": secretData.secret
      },
      body: requestBody
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vogent API error:', response.status, errorText);
      throw new Error('Failed to initiate call. Please try again.');
    }

    // Parse response
    const data = await response.json();
    console.log('Call initiated successfully:', data);
    return data;

  } catch (error) {
    console.error('Error in initiateVogentCall:', error);
    throw new Error('Unable to connect to Room Service. Please try again.');
  }
};


import { supabase } from "@/integrations/supabase/client";

const FLOW_ID = "cd922dc9-eea6-4b43-878f-cb5cfd67e005";
const AGENT_ID = "53660ead-9260-4a23-8df2-55a7050b3340";
const AGENT_PHONE = "9177682024"; // Agent's phone number for outbound calling

export const initiateVogentCall = async (userPhoneNumber: string) => {
  try {
    const { data: secretData, error: secretError } = await supabase.functions.invoke('get-secret', {
      body: { secretName: 'VOGENT_API_KEY' }
    });

    if (secretError || !secretData?.secret) {
      throw new Error("Could not retrieve Vogent API key");
    }

    const response = await fetch("https://api.vogent.ai/flow/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": secretData.secret,
      },
      body: JSON.stringify({
        flowId: FLOW_ID,
        agentId: AGENT_ID,
        webhookUrl: `${window.location.origin}/api/call-completed`,
        phoneNumber: userPhoneNumber.replace(/\D/g, ''), // User's phone number to receive the call
        outboundNumber: AGENT_PHONE, // Agent's number making the call
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to initiate Vogent call");
    }

    const data = await response.json();
    
    // Set up event listener for message from Vogent iframe
    window.addEventListener('message', (event) => {
      if (event.data.type === 'VOGENT_CALL_ENDED') {
        window.location.href = '/';
      }
    });

    return data;
  } catch (error) {
    console.error("Error initiating Vogent call:", error);
    throw error;
  }
};


import { supabase } from "@/integrations/supabase/client";

export const SALES_AGENT_ID = "15b75020-90a0-473a-b6bc-758ced586c6b";

export const initiateVogentCall = async (userPhoneNumber: string, agentId?: string) => {
  try {
    console.log('Calling vogent-call function with phone number:', userPhoneNumber);
    
    const { data, error } = await supabase.functions.invoke('vogent-call', {
      body: { 
        phoneNumber: userPhoneNumber,
        agentId: agentId
      }
    });

    if (error) {
      console.error('Error from Edge Function:', error);
      throw new Error(error.message || 'Failed to initiate call. Please try again.');
    }

    if (!data?.success) {
      console.error('Error response from Edge Function:', data);
      throw new Error(data?.error || 'Failed to initiate call');
    }

    console.log('Call initiated successfully:', data);
    return data;

  } catch (error) {
    console.error('Error in initiateVogentCall:', error);
    throw error;
  }
};

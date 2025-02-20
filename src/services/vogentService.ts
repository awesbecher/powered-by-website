
import { supabase } from "@/integrations/supabase/client";

export const initiateVogentCall = async (userPhoneNumber: string) => {
  try {
    console.log('Calling vogent-call function with phone number:', userPhoneNumber);
    
    const { data, error } = await supabase.functions.invoke('vogent-call', {
      body: { phoneNumber: userPhoneNumber }
    });

    if (error) {
      console.error('Error from Edge Function:', error);
      throw new Error('Failed to initiate call. Please try again.');
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


import { supabase } from "@/integrations/supabase/client";

export const initiateVogentCall = async (userPhoneNumber: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('vogent-call', {
      body: { phoneNumber: userPhoneNumber }
    });

    if (error) {
      console.error('Error calling Vogent service:', error);
      throw new Error('Failed to initiate call. Please try again.');
    }

    console.log('Call initiated successfully:', data);
    return data;

  } catch (error) {
    console.error('Error in initiateVogentCall:', error);
    throw new Error('Unable to connect to Room Service. Please try again.');
  }
};

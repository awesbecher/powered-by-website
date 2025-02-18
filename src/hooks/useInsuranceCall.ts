
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "@/utils/phoneUtils";

export const useInsuranceCall = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);

  const { data: callStatus } = useQuery({
    queryKey: ['callStatus', callId],
    queryFn: async () => {
      if (!callId) return { status: 'pending' };
      try {
        console.log('Fetching call status for ID:', callId);
        const response = await fetch(`https://api.vogent.ai/api/dials/${callId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.VOGENT_API_KEY}`,
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch call status: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Call status response:', data);
        
        const status = data?.dial?.status || data?.status || 'pending';
        console.log('Extracted status:', status);
        
        return { status };
      } catch (error) {
        console.error('Error fetching call status:', error);
        return { status: 'error' };
      }
    },
    enabled: !!callId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'completed' ? false : 5000;
    },
  });

  const sendConfirmationSMS = async (phoneNumber: string) => {
    try {
      console.log('Attempting to send SMS to:', phoneNumber);
      const formattedPhone = '+1' + formatPhoneNumber(phoneNumber);
      
      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          to: formattedPhone,
          message: "Thank you for your insurance quote request! An agent will review your information and get back to you shortly.",
        },
      });

      if (error) {
        console.error('SMS error:', error);
        toast({
          variant: "destructive",
          title: "SMS Error",
          description: "Failed to send confirmation SMS",
        });
        return false;
      }

      console.log('SMS sent successfully:', data);
      return true;
    } catch (error) {
      console.error('SMS error:', error);
      toast({
        variant: "destructive",
        title: "SMS Error",
        description: "Failed to send confirmation SMS",
      });
      return false;
    }
  };

  const initiateCall = async (phoneNumber: string, zipCode: string, selectedProducts: string[]) => {
    if (!phoneNumber || !zipCode || selectedProducts.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please complete all required information",
      });
      return;
    }

    try {
      const cleanedNumber = formatPhoneNumber(phoneNumber);
      const payload = {
        phoneNumber: cleanedNumber,
        type: 'insurance_quote',
        zipCode,
        productTypes: selectedProducts
      };
      
      console.log('Sending payload to initiate-call:', payload);

      const { data, error } = await supabase.functions.invoke('initiate-call', {
        body: payload
      });

      console.log('Call initiation response:', { data, error });

      if (error) {
        console.error('Call initiation error:', error);
        throw error;
      }

      if (!data?.callId) {
        console.error('No call ID in response:', data);
        throw new Error('No call ID received');
      }

      console.log('Call initiated with ID:', data.callId);
      
      toast({
        title: "Call Initiated",
        description: "You will receive a call shortly from our insurance agent.",
      });
      
      setIsCallInProgress(true);
      setCallId(data.callId);
    } catch (error) {
      console.error('Call error:', error);
      setIsCallInProgress(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to initiate call. Please try again.",
      });
    }
  };

  return {
    isCallInProgress,
    callStatus,
    callId,
    initiateCall,
    sendConfirmationSMS,
    setCallId,
    setIsCallInProgress,
  };
};

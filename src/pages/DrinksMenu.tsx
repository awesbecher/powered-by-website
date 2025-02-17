
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderDialog } from "@/components/order/OrderDialog";
import { formatPhoneNumber } from "@/utils/phoneUtils";

interface CallStatus {
  status: string;
}

const DrinksMenu = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [isCallInProgress, setIsCallInProgress] = useState(false);

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

  useEffect(() => {
    if (!callStatus) return;
    
    console.log('Processing call status:', callStatus);
    
    if (callStatus.status === 'completed') {
      console.log('Call completed, sending SMS...');
      
      sendConfirmationSMS().then((success) => {
        if (success) {
          toast({
            title: "Order Confirmed",
            description: "Your order has been placed successfully!",
          });
        }
        setCallId(null);
        setIsCallInProgress(false);
        navigate('/call-confirmation');
      });
    }
  }, [callStatus, navigate]);

  const sendConfirmationSMS = async () => {
    try {
      console.log('Attempting to send SMS to:', phoneNumber);
      const formattedPhone = '+1' + formatPhoneNumber(phoneNumber);
      
      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          to: formattedPhone,
          message: "Thank you for your drinks order! It will be delivered to your room in 30-45 minutes.",
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

  const handleCall = async () => {
    if (!phoneNumber) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your phone number",
      });
      return;
    }

    try {
      const cleanedNumber = formatPhoneNumber(phoneNumber);
      console.log('Initiating call with cleaned number:', cleanedNumber);

      const { data, error } = await supabase.functions.invoke('initiate-call', {
        body: {
          phoneNumber: cleanedNumber,
          type: 'drinks_order'
        }
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
        description: "You will receive a call shortly to take your drinks order.",
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

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      <Link 
        to="/room-service" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Room Service</span>
      </Link>

      <div className="mx-auto max-w-6xl">
        <div className="flex justify-end mb-8">
          <OrderDialog
            isOpen={isOpen}
            isCallInProgress={isCallInProgress}
            onOpenChange={setIsOpen}
            onSubmit={handleCall}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <img 
            src="/lovable-uploads/3c242d77-29a6-4a56-9fc1-c5a16d164a94.png" 
            alt="Drinks Menu" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default DrinksMenu;

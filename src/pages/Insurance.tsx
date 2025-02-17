
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderDialog } from "@/components/order/OrderDialog";
import { formatPhoneNumber } from "@/utils/phoneUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const Insurance = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const isMobile = useIsMobile();

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
            title: "Quote Request Confirmed",
            description: "An insurance agent will process your quote request!",
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
          type: 'insurance_quote'
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

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      {!isMobile && <div className="absolute top-8 right-8">
        <a href="https://madrone.capital/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/lovable-uploads/335f70ec-aa5b-4954-aa12-c425ddd41fc5.png" 
            alt="Madrone Capital Logo" 
            className="h-48 w-auto"
          />
        </a>
      </div>}

      {/* Back button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          Insurance Quote
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <div className="space-y-6">
            <p className="text-xl text-gray-300">
              Welcome to Planter's Insurance. You can speak to our agent to get your personalized insurance quote tailored to your needs. First we need a little bit of information from you:
            </p>
            <ul className="text-left text-lg text-gray-300 space-y-3 mb-8">
              <li>• Quick and easy quote process</li>
              <li>• Competitive rates from top providers</li>
              <li>• Instant policy options</li>
              <li>• Expert guidance throughout</li>
            </ul>
            <div className="flex justify-center">
              <OrderDialog
                isOpen={isOpen}
                isCallInProgress={isCallInProgress}
                onOpenChange={setIsOpen}
                onSubmit={handleCall}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;

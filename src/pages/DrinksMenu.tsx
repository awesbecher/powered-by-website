
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

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

  // Poll for call status if we have a callId
  const { data: callStatus } = useQuery({
    queryKey: ['callStatus', callId],
    queryFn: async () => {
      if (!callId) return { status: 'pending' };
      try {
        const response = await fetch(`https://api.vogent.ai/api/dials/${callId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.VOGENT_API_KEY}`,
          }
        });
        
        if (!response.ok) {
          console.error('Failed to fetch call status:', response.statusText);
          return { status: 'error' };
        }
        
        const data = await response.json();
        console.log('Raw call status response:', data);
        
        // Ensure we get a valid status
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
      console.log('Current status for refetch interval:', status);
      return status === 'completed' ? false : 5000;
    },
  });

  // Watch for call completion and send SMS
  useEffect(() => {
    if (!callStatus) return;
    
    console.log('Current call status:', callStatus.status);
    
    if (callStatus.status === 'completed') {
      console.log('Call completed, sending SMS...');
      
      // Send SMS and navigate
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

  const formatPhoneNumber = (number: string) => {
    // Remove all non-digit characters
    const cleaned = number.replace(/\D/g, '');
    
    // Remove leading "1" if present
    const withoutCountryCode = cleaned.startsWith('1') ? cleaned.slice(1) : cleaned;
    
    // Check if it's exactly 10 digits
    if (withoutCountryCode.length !== 10) {
      throw new Error('Phone number must be 10 digits');
    }
    
    return withoutCountryCode;
  };

  const sendConfirmationSMS = async () => {
    try {
      const formattedPhone = '+1' + formatPhoneNumber(phoneNumber);
      console.log('Sending SMS to:', formattedPhone);

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

      if (error) {
        console.error('Call initiation error:', error);
        throw error;
      }

      if (!data?.callId) {
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
          <Dialog open={isOpen || isCallInProgress} onOpenChange={(open) => {
            if (!isCallInProgress) setIsOpen(open);
          }}>
            <DialogTrigger asChild>
              <button 
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md flex items-center gap-2"
                disabled={isCallInProgress}
              >
                {isCallInProgress ? 'Call in progress...' : 'Start your order'}
                <Phone className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isCallInProgress ? 'Call in Progress' : 'Enter your phone number to place an order'}
                </DialogTitle>
                <DialogDescription>
                  {isCallInProgress 
                    ? 'You will receive a call shortly to take your drinks order...'
                    : 'Enter your phone number to begin your order.'}
                </DialogDescription>
              </DialogHeader>
              {!isCallInProgress ? (
                <div className="flex flex-col space-y-4 pt-4">
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="text-lg"
                  />
                  <button 
                    onClick={handleCall}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-md"
                  >
                    Call Me
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                  <p className="text-center text-sm text-gray-600">
                    Please answer your phone when it rings...
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>
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

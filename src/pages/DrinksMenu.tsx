
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

  // Poll for call status if we have a callId
  const { data: callStatus } = useQuery({
    queryKey: ['callStatus', callId],
    queryFn: async () => {
      if (!callId) return null;
      const response = await fetch(`https://api.vogent.ai/api/dials/${callId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.VOGENT_API_KEY}`,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch call status');
      const data = await response.json();
      console.log('Call status response:', data); // Add logging
      return data as CallStatus;
    },
    enabled: !!callId,
    refetchInterval: (query) => {
      if (!query.state.data) return 5000;
      return query.state.data.status === 'completed' ? false : 5000;
    },
  });

  const sendConfirmationSMS = async () => {
    console.log('Attempting to send SMS to:', phoneNumber); // Add logging
    try {
      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          to: phoneNumber,
          message: "Thank you for your drinks order! It will be delivered to your room in 30-45 minutes.",
        },
      });

      if (error) {
        console.error('Error sending SMS:', error);
        toast({
          variant: "destructive",
          title: "SMS Error",
          description: "Failed to send confirmation SMS",
        });
      } else {
        console.log('SMS sent successfully:', data); // Add logging
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      toast({
        variant: "destructive",
        title: "SMS Error",
        description: "Failed to send confirmation SMS",
      });
    }
  };

  // Watch for call completion and send SMS
  useEffect(() => {
    console.log('Current call status:', callStatus); // Add logging
    if (callStatus?.status === 'completed') {
      console.log('Call completed, sending SMS and navigating...'); // Add logging
      sendConfirmationSMS().then(() => {
        setCallId(null);
        navigate('/call-confirmation');
      });
    }
  }, [callStatus, navigate]);

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
      const { data, error } = await supabase.functions.invoke('initiate-call', {
        body: {
          phoneNumber: phoneNumber.replace(/\D/g, ''),
          type: 'drinks_order'
        }
      });

      if (error) {
        console.error('Error details:', error);
        throw error;
      }

      console.log('Call initiated with ID:', data?.callId); // Add logging
      toast({
        title: "Call Initiated",
        description: "You will receive a call shortly to take your drinks order.",
      });
      setIsOpen(false);
      setCallId(data.callId);
    } catch (error) {
      console.error('Detailed error:', error);
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
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button 
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md flex items-center gap-2"
              >
                Start your order
                <Phone className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter your phone number to place an order</DialogTitle>
              </DialogHeader>
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

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

const FoodMenu = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);

  // Poll for call status if we have a callId
  const query = useQuery<CallStatus | null>({
    queryKey: ['callStatus', callId],
    queryFn: async () => {
      if (!callId) return null;
      const response = await fetch(`https://api.vogent.ai/api/dials/${callId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.VOGENT_API_KEY}`,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch call status');
      return response.json();
    },
    enabled: !!callId,
    refetchInterval: (data) => {
      // Stop polling once call is completed
      if (!data) return 5000;
      return data.status === 'completed' ? false : 5000;
    },
  });

  // Watch for call completion
  useEffect(() => {
    if (query.data && query.data.status === 'completed') {
      setCallId(null);
      navigate('/call-confirmation');
    }
  }, [query.data, navigate]);

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
          type: 'food_order'
        }
      });

      if (error) {
        console.error('Error details:', error);
        throw error;
      }

      toast({
        title: "Call Initiated",
        description: "You will receive a call shortly to take your food order.",
      });
      setIsOpen(false);
      setPhoneNumber("");
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
            src="/lovable-uploads/ac8b8cfd-fc02-4e33-88bc-33898e7820f9.png" 
            alt="Restaurant Menu" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;

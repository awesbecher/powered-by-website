
import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DrinksMenu = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
          type: 'drink_order'
        }
      });

      console.log('Supabase function response:', { data, error });

      if (error) {
        console.error('Error details:', error);
        throw error;
      }

      toast({
        title: "Call Initiated",
        description: "You will receive a call shortly to take your drink order.",
      });
      setIsOpen(false);
      setPhoneNumber("");
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
      {!isMobile && <div className="absolute top-8 right-8">
        <img 
          src="/lovable-uploads/f61255a3-5368-4739-a068-ec3431ea636f.png" 
          alt="GrandView Hotel Logo" 
          className="h-24 w-auto"
        />
      </div>}

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
            src="/lovable-uploads/1b808953-0aa3-4587-ae4b-8ecef7d13cce.png" 
            alt="Drinks Menu" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default DrinksMenu;

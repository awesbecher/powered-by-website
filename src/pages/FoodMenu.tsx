
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/layout/Footer";

const FoodMenu = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCall = async () => {
    if (!phoneNumber) {
      toast({
        variant: "destructive",
        title: "Please enter your phone number",
        description: "A phone number is required to place your order."
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('initiate-call', {
        body: { 
          phoneNumber: phoneNumber.replace(/\D/g, ''),
          type: 'room-service'
        }
      });

      if (error) throw error;

      toast({
        title: "Call initiated!",
        description: "You will receive a call shortly to place your order."
      });
      setIsOpen(false);
      setPhoneNumber("");
      navigate('/room-service');
    } catch (error) {
      console.error('Error initiating call:', error);
      toast({
        variant: "destructive",
        title: "Error initiating call",
        description: "There was an error initiating your call. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#222222] px-4 py-16 sm:px-6 lg:px-8">
      {!isMobile && <div className="absolute top-8 right-8">
        <img 
          src="/assets/images/f61255a3-5368-4739-a068-ec3431ea636f.png" 
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

      <div className="absolute left-1/2 transform -translate-x-1/2 top-8">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2">
              Start Your Order
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
                onChange={e => setPhoneNumber(e.target.value)} 
                className="text-lg" 
              />
              <button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-md disabled:opacity-50"
                onClick={handleCall}
                disabled={isLoading}
              >
                {isLoading ? "Initiating call..." : "Call Me"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mx-auto max-w-6xl mt-20">
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <img 
            src="/assets/images/ac8b8cfd-fc02-4e33-88bc-33898e7820f9.png" 
            alt="Restaurant Menu" 
            className="w-full h-auto"
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FoodMenu;

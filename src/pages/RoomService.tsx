import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RoomService = () => {
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
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
      const callParams = {
        phoneNumber: cleanedPhoneNumber,
        type: 'room-service',
        flowId: '9e282047-6541-4a98-b89f-fdb375ea4dc4',
        agentId: '66630bc9-27df-4a30-831e-cff3664b3b46',
        from: '+19179361793'
      };

      console.log('Attempting to initiate room service call with:', callParams);

      const { error } = await supabase.functions.invoke('initiate-call', {
        body: callParams
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      toast({
        title: "Call initiated!",
        description: "You will receive a call shortly to place your order."
      });
      setIsOpen(false);
      setPhoneNumber("");
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
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute top-8 right-8">
        <img src="/lovable-uploads/f61255a3-5368-4739-a068-ec3431ea636f.png" alt="GrandView Hotel Logo" className="h-24 w-auto" />
      </div>

      <Link to="/" className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors">
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          Room Service
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-xl text-gray-300 mb-8">Our Room Service team is ready to take your room service order. Place your order anytime, day or night.</p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/food-menu">
                <button className="bg-neutral-800 text-white px-6 py-2 rounded-md hover:bg-neutral-700 transition-colors w-full sm:w-auto">
                  Food Menu
                </button>
              </Link>
              <Link to="/drinks-menu">
                <button className="bg-neutral-800 text-white px-6 py-2 rounded-md hover:bg-neutral-700 transition-colors w-full sm:w-auto">
                  Drinks Menu
                </button>
              </Link>
            </div>
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
                    disabled={isLoading}
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
        </div>
      </div>
    </div>
  );
};

export default RoomService;


import { Link } from "react-router-dom";
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

const RoomService = () => {
  const { toast } = useToast();

  const handleCall = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('initiate-call', {
        body: {
          phoneNumber: '6502547823',
          type: 'room_service'
        }
      });

      console.log('Supabase function response:', { data, error });

      if (error) {
        console.error('Error details:', error);
        throw error;
      }

      toast({
        title: "Call Initiated",
        description: "You will receive a call shortly to take your room service order.",
      });
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
      {/* Logo */}
      <div className="absolute top-8 right-8">
        <a 
          href="https://madrone.capital/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src="/lovable-uploads/335f70ec-aa5b-4954-aa12-c425ddd41fc5.png" 
            alt="Madrone Capital Logo" 
            className="h-48 w-auto"
          />
        </a>
      </div>

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
          Room Service
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-xl text-gray-300 mb-8">
            Our virtual agent is ready to take your room service order. 
            Place your order anytime, day or night.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/food-menu">
                <button 
                  className="bg-neutral-800 text-white px-6 py-2 rounded-md hover:bg-neutral-700 transition-colors w-full sm:w-auto"
                >
                  Food Menu
                </button>
              </Link>
              <Link to="/drinks-menu">
                <button 
                  className="bg-neutral-800 text-white px-6 py-2 rounded-md hover:bg-neutral-700 transition-colors w-full sm:w-auto"
                >
                  Drinks Menu
                </button>
              </Link>
            </div>
            <div className="flex justify-center w-full">
              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    Start Your Order
                    <Phone className="h-4 w-4" />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>How would you like to place your order?</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center space-y-4">
                    <Link to="/food-menu" className="w-full">
                      <button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-md">
                        Order Here
                      </button>
                    </Link>
                    <div className="text-sm text-gray-500 font-medium">OR</div>
                    <button 
                      onClick={handleCall}
                      className="w-full bg-neutral-800 text-white hover:bg-neutral-700 px-6 py-3 rounded-md"
                    >
                      Call us @ (650) 254-7823
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomService;

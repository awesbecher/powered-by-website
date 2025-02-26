
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Home, Key, Bike, Sailboat, Phone } from "lucide-react";
import { useState } from "react";
import { InsuranceProductCard } from "@/components/insurance/InsuranceProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Insurance = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      setIsCallActive(false);
      // Redirect to demo page
      navigate('/demo');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to end call",
        description: error.message || "Please try again later."
      });
    }
  };

  const handleCall = async () => {
    setIsLoading(true);
    try {
      await initiateVapiCall();
      setIsCallActive(true);
      toast({
        title: "Call initiated",
        description: "You are now connected to a Planter's Insurance agent."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error.message || "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const insuranceProducts = [
    { id: 'auto', name: 'Auto', icon: Car },
    { id: 'home', name: 'Homeowners', icon: Home },
    { id: 'renters', name: 'Renters', icon: Key },
    { id: 'motorcycle', name: 'Motorcycle / ATV', icon: Bike },
    { id: 'boat', name: 'Boat', icon: Sailboat },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="absolute inset-0 top-32 h-[500px] z-0">
        <img 
          src="/lovable-uploads/e9a419d6-efff-471a-b7fc-fc3f892e736c.png"
          alt="Insurance Coverage"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#222222] via-transparent to-[#222222]"></div>
      </div>

      <Dialog open={isCallActive} onOpenChange={(open) => !open && handleEndCall()}>
        <DialogContent className="bg-[#222222] text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Your call with Planter's Insurance is in progress</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-gray-300">
              You are currently in a voice conversation with a Planter's Insurance agent. You can end the call at any time by clicking the button below.
            </p>
            <Button 
              onClick={handleEndCall}
              className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white font-bold"
            >
              End Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="relative z-10 px-4 py-32 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span>Back to Services</span>
        </Link>

        <div className="mx-auto max-w-3xl text-center">
          <img 
            src="/lovable-uploads/403d2bfb-bc52-4ca1-937c-64ab85d08216.png"
            alt="Planter's Insurance"
            className="h-16 mx-auto mb-12"
          />
          
          <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
            <h1 className="text-5xl font-bold text-white mb-8 flex flex-col">
              <span>Welcome to Planter's.</span>
              <span className="text-accent">You're covered with us.</span>
            </h1>
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xl text-gray-300">
                  Our insurance specialists are ready to help you learn about our products and get your set up with a personalized quote. Click the button below to be connected to a Planter's Insurance team member.
                </p>
              </div>

              <div className="flex justify-center">
                <Button 
                  className="w-64 h-[4.5rem] bg-accent hover:bg-accent/90 text-white text-lg px-6 flex flex-col items-center justify-center space-y-0"
                  variant="default"
                  onClick={handleCall}
                  disabled={isLoading}
                >
                  <span className="leading-tight">Speak to a Planter's</span>
                  <span className="flex items-center leading-tight">
                    Insurance Agent Now
                    <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
                  </span>
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-xl text-gray-300 font-bold">
                  Our Products:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {insuranceProducts.map((product) => (
                    <InsuranceProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      icon={product.icon}
                      isSelected={selectedProducts.includes(product.id)}
                      isEnabled={true}
                      onSelect={handleProductSelect}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;


import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Home, Key, Bike, Sailboat, Phone } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { InsuranceProductCard } from "@/components/insurance/InsuranceProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const Insurance = () => {
  const [zipCode, setZipCode] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProductSelect = (productId: string) => {
    if (zipCode.length !== 5) return;
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleCall = async () => {
    if (!phoneNumber) {
      toast({
        variant: "destructive",
        title: "Please enter your phone number",
        description: "A phone number is required to connect with an insurance agent."
      });
      return;
    }

    setIsLoading(true);
    try {
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
      const callParams = {
        phoneNumber: cleanedPhoneNumber,
        type: 'insurance',
        flowId: '15b75020-90a0-473a-b6bc-758ced586c6b',
        agentId: 'b79e025d-bb6c-4deb-99d5-a5f2f573c639',
        from: '9179361793',
        metadata: {
          zipCode,
          selectedProducts
        }
      };

      console.log('Attempting to initiate insurance call with:', callParams);

      const { error } = await supabase.functions.invoke('initiate-call', {
        body: callParams
      });

      if (error) throw error;

      toast({
        title: "Call initiated!",
        description: "You will receive a call shortly from a Planter's Insurance agent."
      });
      setIsOpen(false);
      setPhoneNumber("");
      navigate('/');
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

  const insuranceProducts = [
    { id: 'auto', name: 'Auto', icon: Car },
    { id: 'home', name: 'Homeowners', icon: Home },
    { id: 'renters', name: 'Renters', icon: Key },
    { id: 'motorcycle', name: 'Motorcycle / ATV', icon: Bike },
    { id: 'boat', name: 'Boat', icon: Sailboat },
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <img 
        src="/lovable-uploads/403d2bfb-bc52-4ca1-937c-64ab85d08216.png"
        alt="Planter's Insurance"
        className="absolute top-8 right-8 h-12"
      />

      <div className="mx-auto max-w-3xl text-center">
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-5xl font-bold text-white mb-8">Online Insurance Quote</h1>
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-gray-300">
                Welcome to Planter's Insurance. Get a quote tailored to your needs.
              </p>
              <p className="text-xl text-gray-300">
                Enter your zip code to get started:
              </p>
              <div className="max-w-xs mx-auto">
                <Input
                  type="text"
                  placeholder="Enter zip code"
                  value={zipCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    setZipCode(value);
                  }}
                  className="text-lg text-center"
                  maxLength={5}
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-gray-300">
                Select your insurance products:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insuranceProducts.map((product) => (
                  <InsuranceProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    icon={product.icon}
                    isSelected={selectedProducts.includes(product.id)}
                    isEnabled={zipCode.length === 5}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
            </div>

            {selectedProducts.length > 0 && (
              <div className="space-y-4">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-white"
                      variant="default"
                    >
                      Speak to a Planter's Insurance Agent Now
                      <Phone className="h-4 w-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Enter your phone number to speak with an agent</DialogTitle>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;

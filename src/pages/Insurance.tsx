
import { Link } from "react-router-dom";
import { ArrowLeft, Car, Home, Key, Bike, Sailboat, Phone } from "lucide-react";
import { useState } from "react";
import { InsuranceProductCard } from "@/components/insurance/InsuranceProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { initiateVogentCall } from "@/services/vogentService";
import { Input } from "@/components/ui/input";

const Insurance = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleProductSelect = (productId: string) => {
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
      await initiateVogentCall(phoneNumber);
      setIsOpen(false);
      setPhoneNumber("");
      toast({
        title: "Call initiated",
        description: "An insurance agent will call you shortly."
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
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-64 h-16 bg-accent hover:bg-accent/90 text-white text-lg"
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
                      />
                      <Button 
                        className="w-full"
                        onClick={handleCall}
                        disabled={isLoading}
                      >
                        {isLoading ? "Initiating call..." : "Call Me"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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

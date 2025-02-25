import { Link } from "react-router-dom";
import { ArrowLeft, Car, Home, Key, Bike, Sailboat, Phone } from "lucide-react";
import { useState } from "react";
import { InsuranceProductCard } from "@/components/insurance/InsuranceProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { initiateVogentCall } from "@/services/vogentService";

const Insurance = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    if (!value) return "";
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

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
      await initiateVogentCall(phoneNumber, 'insurance');
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
                      className="w-64 h-[4.5rem] bg-accent hover:bg-accent/90 text-white text-lg px-6 flex flex-col items-center justify-center space-y-0"
                      variant="default"
                    >
                      <span className="leading-tight">Speak to a Planter's</span>
                      <span className="flex items-center leading-tight">
                        Insurance Agent Now
                        <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Enter your phone number to speak with an insurance agent</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4 pt-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0 bg-gray-800 p-2 rounded border border-gray-700">
                          +1
                        </div>
                        <Input 
                          type="tel" 
                          placeholder="(555) 123-4567"
                          value={formatPhoneNumber(phoneNumber)}
                          onChange={handlePhoneNumberChange}
                          className="flex-1 text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => setIsOpen(false)}
                          className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="w-full bg-accent hover:bg-accent/90 text-white transition-colors"
                          onClick={handleCall}
                          disabled={isLoading}
                        >
                          {isLoading ? "Initiating call..." : "Call Me"}
                        </Button>
                      </div>
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

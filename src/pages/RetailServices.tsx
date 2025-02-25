
import { Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { initiateVogentCall } from "@/services/vogentService";

const services = [
  {
    name: "Classic Haircut",
    description: "Precision cut with attention to detail and style preferences",
    price: "$35",
    duration: "30 min"
  },
  {
    name: "Beard Trim & Shape",
    description: "Professional beard grooming and styling",
    price: "$25",
    duration: "20 min"
  },
  {
    name: "Premium Package",
    description: "Haircut, beard trim, hot towel treatment & styling",
    price: "$65",
    duration: "60 min"
  },
  {
    name: "Hot Towel Shave",
    description: "Traditional straight razor shave with hot towel treatment",
    price: "$40",
    duration: "45 min"
  },
  {
    name: "Kids Haircut",
    description: "Gentle haircut for children under 12",
    price: "$25",
    duration: "30 min"
  },
  {
    name: "Hair & Scalp Treatment",
    description: "Deep conditioning treatment with scalp massage",
    price: "$45",
    duration: "40 min"
  }
];

const RetailServices = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCall = async () => {
    if (!phoneNumber) {
      toast({
        variant: "destructive",
        title: "Please enter your phone number",
        description: "A phone number is required to connect with an agent."
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
        description: "An agent will call you shortly."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Logo */}
      <div className="absolute top-24 right-8 z-10">
        <img 
          src="/lovable-uploads/07f82a95-cea8-417e-96f0-5d8ef95f0200.png"
          alt="Flagship Barbers Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Book a Free Consultation Button */}
      <div className="absolute top-8 right-8 z-20">
        <Link 
          to="/contact"
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
        >
          Book a Free Consultation
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/dac317cc-0dbe-4fbd-9e8b-8f3e4e1ef731.png"
            alt="Professional Barbershop Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative w-full pt-24 px-4 lg:px-8">
          <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 text-white">
              Welcome to Flagship Barbers
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg mb-8">
              Flagship Barbers has been serving the Tacoma public for 25 years. We specialize in classic barbershop style and fades. Select which services you'd like and then click on Book an Appointment.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Book an Appointment
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-[#222222] text-white border-gray-800">
                  <DialogHeader>
                    <DialogTitle>Enter your phone number to speak with an agent</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg text-white">+1</span>
                      <Input 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        value={phoneNumber} 
                        onChange={e => setPhoneNumber(e.target.value)} 
                        className="text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
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
                        className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
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
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.name}
              className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                <span className="text-accent font-bold">{service.price}</span>
              </div>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RetailServices;

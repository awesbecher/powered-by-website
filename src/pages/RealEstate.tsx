
import { Phone, Home, Building, DollarSign, Users } from "lucide-react";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/real-estate/PropertyCard";
import { ServiceCard } from "@/components/real-estate/ServiceCard";
import { HeroSection } from "@/components/real-estate/HeroSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVogentCall } from "@/services/vogentService";

const RealEstate = () => {
  const scrollToProperties = () => {
    const featuredSection = document.getElementById('featured-properties');
    featuredSection?.scrollIntoView({ behavior: 'smooth' });
  };

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
      {/* Township Logo */}
      <div className="fixed top-20 right-6 z-50">
        <img 
          src="/lovable-uploads/a5338bda-4580-432c-a1b8-71df71d89c29.png"
          alt="Township Real Estate Logo"
          className="h-16 w-auto object-cover"
        />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Action Buttons */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 -mt-20 mb-16">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Speak with an Agent
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#222222] text-white border-gray-800">
              <DialogHeader>
                <DialogTitle>Enter your phone number to speak with an agent</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 pt-4">
                <Input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  value={phoneNumber} 
                  onChange={e => setPhoneNumber(e.target.value)} 
                  className="text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="w-full border-gray-700 text-white hover:bg-gray-800 hover:text-white"
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
          <button 
            onClick={scrollToProperties}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-semibold transition-colors"
          >
            View Featured Listings
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-0">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <ServiceCard
            icon={Home}
            title="Residential Sales"
            description="Expert guidance in buying or selling your home"
          />
          <ServiceCard
            icon={Building}
            title="Commercial"
            description="Professional commercial property services"
          />
          <ServiceCard
            icon={DollarSign}
            title="Property Valuation"
            description="Accurate market value assessments"
          />
          <ServiceCard
            icon={Users}
            title="Consultation"
            description="Personalized real estate consulting"
          />
        </div>
      </div>

      {/* Featured Properties */}
      <div id="featured-properties" className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.title} property={property} />
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <div className="bg-accent/10 rounded-lg p-8 text-center border border-accent/20">
          <h2 className="text-2xl font-bold mb-4 text-white">Ready to Find Your Dream Home?</h2>
          <p className="text-white mb-6 max-w-2xl mx-auto">
            Our experienced agents are here to help you navigate the Edison Township real estate market. Contact us today for a personalized consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call Now: (732) 555-0123
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-semibold transition-colors">
              Schedule a Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstate;

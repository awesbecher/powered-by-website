import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall } from "@/services/vapiService";
import { HeroSection } from "@/components/real-estate/HeroSection";
import { ActionButtons } from "@/components/real-estate/ActionButtons";
import { ServicesSection } from "@/components/real-estate/ServicesSection";
import { FeaturedProperties } from "@/components/real-estate/FeaturedProperties";
import { ContactSection } from "@/components/real-estate/ContactSection";
import { getVapiInstance } from "@/services/vapiService";
import { useNavigate } from "react-router-dom";

const RealEstate = () => {
  const scrollToProperties = () => {
    const featuredSection = document.getElementById('featured-properties');
    featuredSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCall = async () => {
    setIsLoading(true);
    try {
      const vapi = getVapiInstance();
      await vapi.start("f8131f3d-58aa-4c81-a79e-1bf758803775"); // Use the specific Assistant ID for real estate
      
      // Keep dialog open during the call
      setIsOpen(true);
      setIsScheduleOpen(false);
      
      // Listen for call end event
      vapi.on("call-end", () => {
        setIsLoading(false);
        setIsOpen(false);
        navigate('/demo');
      });

      toast({
        title: "Call initiated",
        description: "Our AI agent is connecting with you."
      });
    } catch (error) {
      console.error('Error initiating call:', error);
      setIsLoading(false);
      setIsOpen(false);
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
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

      <HeroSection />
      
      <ActionButtons 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        phoneNumber=""
        setPhoneNumber={() => {}}
        handleCall={handleCall}
        isLoading={isLoading}
        scrollToProperties={scrollToProperties}
      />

      <ServicesSection />
      
      <FeaturedProperties />
      
      <ContactSection 
        isScheduleOpen={isScheduleOpen}
        setIsScheduleOpen={setIsScheduleOpen}
        phoneNumber=""
        setPhoneNumber={() => {}}
        handleCall={handleCall}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RealEstate;

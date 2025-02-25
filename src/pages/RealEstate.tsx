
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVogentCall } from "@/services/vogentService";
import { HeroSection } from "@/components/real-estate/HeroSection";
import { ActionButtons } from "@/components/real-estate/ActionButtons";
import { ServicesSection } from "@/components/real-estate/ServicesSection";
import { FeaturedProperties } from "@/components/real-estate/FeaturedProperties";
import { ContactSection } from "@/components/real-estate/ContactSection";

const RealEstate = () => {
  const scrollToProperties = () => {
    const featuredSection = document.getElementById('featured-properties');
    featuredSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
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
      await initiateVogentCall(phoneNumber, 'realEstate');
      setIsOpen(false);
      setIsScheduleOpen(false);
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

      <HeroSection />
      
      <ActionButtons 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleCall={handleCall}
        isLoading={isLoading}
        scrollToProperties={scrollToProperties}
      />

      <ServicesSection />
      
      <FeaturedProperties />
      
      <ContactSection 
        isScheduleOpen={isScheduleOpen}
        setIsScheduleOpen={setIsScheduleOpen}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleCall={handleCall}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RealEstate;

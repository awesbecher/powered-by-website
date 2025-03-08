
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { HeroSection } from "@/components/real-estate/HeroSection";
import { ActionButtons } from "@/components/real-estate/ActionButtons";
import { ServicesSection } from "@/components/real-estate/ServicesSection";
import { FeaturedProperties } from "@/components/real-estate/FeaturedProperties";
import { ContactSection } from "@/components/real-estate/ContactSection";
import { ActiveCallDialog } from "@/components/real-estate/ActiveCallDialog";
import { useRealEstateCall } from "@/hooks/useRealEstateCall";
import { useRealEstateCallState } from "@/hooks/useRealEstateCallState";

const RealEstate = () => {
  const scrollToProperties = () => {
    const featuredSection = document.getElementById('featured-properties');
    featuredSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const {
    isOpen,
    setIsOpen,
    isScheduleOpen,
    setIsScheduleOpen,
    phoneNumber,
    setPhoneNumber
  } = useRealEstateCallState();

  const {
    isLoading,
    isCallActive,
    isMuted,
    handleCall,
    handleEndCall,
    toggleMute
  } = useRealEstateCall();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Back Navigation */}
      <Link 
        to="/demo" 
        className="absolute top-8 left-8 z-10 flex items-center text-white hover:text-gray-300 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 mr-1" />
        <span>Back to Demo</span>
      </Link>

      <div className="fixed top-20 right-6 z-50">
        <img 
          src="/lovable-uploads/a5338bda-4580-432c-a1b8-71df71d89c29.png"
          alt="Township Real Estate Logo"
          className="h-16 w-auto object-cover"
        />
      </div>

      {/* Active Call Dialog */}
      <ActiveCallDialog 
        isOpen={isCallActive} 
        isMuted={isMuted}
        handleEndCall={handleEndCall}
        toggleMute={toggleMute}
      />

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

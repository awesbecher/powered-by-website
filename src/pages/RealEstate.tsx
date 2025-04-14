import { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { HeroSection } from "@/components/real-estate/HeroSection";
import { ActionButtons } from "@/components/real-estate/ActionButtons";
import { ServicesSection } from "@/components/real-estate/ServicesSection";
import { FeaturedProperties } from "@/components/real-estate/FeaturedProperties";
import { ContactSection } from "@/components/real-estate/ContactSection";
import { ActiveCallDialog } from "@/components/real-estate/ActiveCallDialog";
import { useRealEstateCall } from "@/hooks/useRealEstateCall";
import { useRealEstateCallState } from "@/hooks/useRealEstateCallState";

const RealEstate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Navbar />

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

      <Footer />
    </div>
  );
};

export default RealEstate;

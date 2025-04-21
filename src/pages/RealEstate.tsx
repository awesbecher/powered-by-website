import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { HeroSection } from "@/components/real-estate/HeroSection";
import { ActionButtons } from "@/components/real-estate/ActionButtons";
import { ServicesSection } from "@/components/real-estate/ServicesSection";
import { FeaturedProperties } from "@/components/real-estate/FeaturedProperties";
import { ContactSection } from "@/components/real-estate/ContactSection";
import { ActiveCallDialog } from "@/components/real-estate/ActiveCallDialog";

const RealEstate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToProperties = () => {
    const featuredSection = document.getElementById('featured-properties');
    featuredSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCall = async () => {
    if (!phoneNumber) return;
    setIsLoading(true);
    // TODO: Implement new call functionality
    setIsLoading(false);
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

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


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
  
  // Add sample properties data
  const [properties, setProperties] = useState([
    {
      id: '1',
      title: 'Modern Apartment',
      price: '$250,000',
      location: 'Downtown',
      bedrooms: 2,
      bathrooms: 1,
      area: '850 sq ft',
      image: '/lovable-uploads/2d521c8d-084d-4a87-8491-cb795033a1d6.png'
    },
    {
      id: '2',
      title: 'Family Home',
      price: '$450,000',
      location: 'Suburbs',
      bedrooms: 4,
      bathrooms: 2.5,
      area: '2200 sq ft',
      image: '/lovable-uploads/92d1275c-847a-49ad-a297-792c7bf899a7.png'
    }
  ]);

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
      
      <div id="featured-properties">
        <FeaturedProperties properties={properties} />
      </div>
      
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

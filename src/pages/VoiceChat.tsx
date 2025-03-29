
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/voice-chat/page-sections/HeroSection";
import { FeaturesSection } from "@/components/voice-chat/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/voice-chat/page-sections/BenefitsSection";
import { FAQSection } from "@/components/voice-chat/page-sections/FAQSection";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VoiceChat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [initialLoad, setInitialLoad] = React.useState(true);

  React.useEffect(() => {
    // After initial render, set initialLoad to false to trigger animations
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#0f0f0f]">
      <Navbar />
      <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
      <FeaturesSection />
      <BenefitsSection />
      <FAQSection />
      <ClosingCTA 
        customHeading="Ready to Transform Your Website With AI Voice Chat?"
        customButtonText="Get Started"
        onContactClick={handleContact}
      />
      <Footer />
    </div>
  );
};

export default VoiceChat;

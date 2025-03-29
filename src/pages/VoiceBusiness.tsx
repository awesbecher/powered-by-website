
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/voice-business/page-sections/HeroSection";
import { FeaturesSection } from "@/components/voice-business/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/voice-business/page-sections/BenefitsSection";
import { FAQSection } from "@/components/voice-business/page-sections/FAQSection";
import { FinalCTASection } from "@/components/voice-business/page-sections/FinalCTASection";
import { useNavigate } from "react-router-dom";

const VoiceBusiness = () => {
  const navigate = useNavigate();
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
      <FinalCTASection handleContact={handleContact} />
      <Footer />
    </div>
  );
};

export default VoiceBusiness;

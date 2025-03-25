
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/voice-business/page-sections/HeroSection";
import { FeaturesSection } from "@/components/voice-business/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/voice-business/page-sections/BenefitsSection";
import { FAQSection } from "@/components/voice-business/page-sections/FAQSection";
import { FinalCTASection } from "@/components/voice-business/page-sections/FinalCTASection";
import { useNavigate } from "react-router-dom";

const AIVoiceBusinessLines = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="relative">
        {/* Background gradient sphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Main content */}
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        <FeaturesSection />
        <BenefitsSection />
        <FAQSection />
        <FinalCTASection handleContact={handleContact} />
      </div>
      <Footer />
    </div>
  );
};

export default AIVoiceBusinessLines;

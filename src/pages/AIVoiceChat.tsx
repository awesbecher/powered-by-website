
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/voice-chat/page-sections/HeroSection";
import { FeaturesSection } from "@/components/voice-chat/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/voice-chat/page-sections/BenefitsSection";
import { SocialProofSection } from "@/components/voice-chat/page-sections/SocialProofSection";
import { CTASection } from "@/components/voice-chat/page-sections/CTASection";
import { FAQSection } from "@/components/voice-chat/page-sections/FAQSection";
import { FinalCTASection } from "@/components/voice-chat/page-sections/FinalCTASection";
import { properties } from "@/data/properties";
import { forcePrefetchImages } from "@/components/voice-chat/utils/imageUtils";

const AIVoiceChat = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Preload images as soon as this component mounts
  useEffect(() => {
    // Get all property images and prefetch them immediately
    const propertyImages = properties.map(property => property.image);
    forcePrefetchImages(propertyImages);
    
    // Short timeout to allow for immediate preloading before animation
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleContact = () => {
    navigate("/contact");
    toast({
      title: "Good choice!",
      description: "You're one step closer to implementing AI voice chat."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#0f0f0f]">
      <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
      <FeaturesSection />
      <BenefitsSection />
      <SocialProofSection />
      <CTASection handleContact={handleContact} />
      <FAQSection />
      <FinalCTASection handleContact={handleContact} />
    </div>
  );
};

export default AIVoiceChat;


import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { WebsiteHeader } from "@/components/voice-chat/WebsiteHeader";
import { HeroSection } from "@/components/voice-chat/page-sections/HeroSection";
import { FeaturesSection } from "@/components/voice-chat/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/voice-chat/page-sections/BenefitsSection";
import { CTASection } from "@/components/voice-chat/page-sections/CTASection";
import { FAQSection } from "@/components/voice-chat/page-sections/FAQSection";
import { FinalCTASection } from "@/components/voice-chat/page-sections/FinalCTASection";
import { properties } from "@/data/properties";
import { forcePrefetchImages, addCSSImagePreloading } from "@/components/voice-chat/utils/imageUtils";

// Preload images immediately without waiting for component mounting
// This runs at module load time, before any components are rendered
const propertyImages = properties.map(property => property.image);
const otherImages = [
  "/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png",  // Logo
  "/lovable-uploads/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png", // Agent image
  "/lovable-uploads/64bb9d7d-aaaa-4015-9a4b-839ae9f0114d.png", // Powered By Agency logo
];
const allImages = [...propertyImages, ...otherImages];
forcePrefetchImages(allImages);
addCSSImagePreloading(allImages);

const AIVoiceChat = () => {
  const [initialLoad, setInitialLoad] = useState(false); // Start as false to skip animation
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set to false immediately to avoid any initial load animation
    setInitialLoad(false);
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
      <CTASection handleContact={handleContact} />
      <FAQSection />
      <FinalCTASection handleContact={handleContact} />
    </div>
  );
};

export default AIVoiceChat;


import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/text-agent/page-sections/HeroSection";
import { FeaturesSection } from "@/components/text-agent/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/text-agent/page-sections/BenefitsSection";
import { CTASection } from "@/components/text-agent/page-sections/CTASection";
import { FAQSection } from "@/components/text-agent/page-sections/FAQSection";
import { FinalCTASection } from "@/components/text-agent/page-sections/FinalCTASection";
import { forcePrefetchImages, addCSSImagePreloading } from "@/components/voice-chat/utils/imageUtils";

// Preload essential images
const images = [
  "/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png",  // Logo
  "/lovable-uploads/65c7ad96-17cd-4bc0-8a6d-0148a49f3402.png", // Powered By Agency logo
];
forcePrefetchImages(images);
addCSSImagePreloading(images);

const TextAgent = () => {
  const [initialLoad, setInitialLoad] = useState(false);
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
      description: "You're one step closer to implementing AI text automation for your business."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#0f0f0f]">
      <Navbar />
      <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection handleContact={handleContact} />
      <FAQSection />
      <FinalCTASection handleContact={handleContact} />
      <Footer />
    </div>
  );
};

export default TextAgent;

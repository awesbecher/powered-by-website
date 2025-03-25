
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/text-agent/page-sections/HeroSection";
import { ServiceBoxes } from "@/components/text-agent/page-sections/ServiceBoxes";
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
  "/lovable-uploads/822234f6-1f9f-4e2d-aede-2ef9842c38b0.png", // Texting background image
  "/lovable-uploads/9a61c267-112f-464b-9479-2be87bbe7d9b.png", // Sarah - AI Text Agent image
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
      {/* Background image at the top */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/lovable-uploads/822234f6-1f9f-4e2d-aede-2ef9842c38b0.png" 
          alt="Person texting on phone" 
          className="w-full h-[60vh] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/80 via-[#2f1c4a] to-[#1a0b2e]"></div>
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        
        {/* ServiceBoxes moved directly below the hero section with less padding */}
        <div className="py-4 px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl flex justify-center">
          <ServiceBoxes initialLoad={initialLoad} />
        </div>
        
        <FeaturesSection />
        <BenefitsSection />
        <CTASection handleContact={handleContact} />
        <FAQSection />
        <FinalCTASection handleContact={handleContact} />
        <Footer />
      </div>
    </div>
  );
};

export default TextAgent;

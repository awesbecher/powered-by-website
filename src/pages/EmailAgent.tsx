
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/email-agent/page-sections/HeroSection";
import { ServiceBoxes } from "@/components/email-agent/page-sections/ServiceBoxes";
import { FeaturesSection } from "@/components/email-agent/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/email-agent/page-sections/BenefitsSection";
import { FAQSection } from "@/components/email-agent/page-sections/FAQSection";
import { FinalCTASection } from "@/components/email-agent/page-sections/FinalCTASection";
import { forcePrefetchImages, addCSSImagePreloading } from "@/components/voice-chat/utils/imageUtils";

// Preload essential images
const images = [
  "/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png",  // Logo
  "/lovable-uploads/65c7ad96-17cd-4bc0-8a6d-0148a49f3402.png", // Powered By Agency logo
];
forcePrefetchImages(images);
addCSSImagePreloading(images);

const EmailAgent = () => {
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
      description: "You're one step closer to implementing AI email automation for your business."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#0f0f0f]">
      {/* Background image at the top */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/lovable-uploads/c5c962fc-964e-4139-a5fe-28f83a466b3a.png" 
          alt="Email background" 
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/60 via-[#1a0b2e]/80 to-[#1a0b2e]"></div>
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        
        {/* ServiceBoxes moved out of HeroSection and centered below it */}
        <div className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl flex justify-center">
          <ServiceBoxes initialLoad={initialLoad} />
        </div>
        
        <FeaturesSection />
        <BenefitsSection />
        {/* CTASection removed from here */}
        <FAQSection />
        <FinalCTASection handleContact={handleContact} />
        <Footer />
      </div>
    </div>
  );
};

export default EmailAgent;

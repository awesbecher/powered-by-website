
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/voice-chat/page-sections/HeroSection";
import { FeaturesSection } from "@/components/voice-chat/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/voice-chat/page-sections/BenefitsSection";
import { FAQSection } from "@/components/voice-chat/page-sections/FAQSection";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { properties } from "@/data/properties";
import { forcePrefetchImages, addCSSImagePreloading } from "@/components/voice-chat/utils/imageUtils";

// Preload images immediately without waiting for component mounting
// This runs at module load time, before any components are rendered
const propertyImages = properties.map(property => property.image);
const otherImages = [
  "/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png",  // Logo
  "/lovable-uploads/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png", // Agent image
  "/lovable-uploads/314cb21d-7fdb-4cdd-a44e-da8af003a7f9.png", // Phoenix Realty Inc. Logo
  "/lovable-uploads/b73aa6e5-5a81-4225-a13d-a2b900e9c3c7.png", // New uploaded logo
  "/lovable-uploads/4bf8609b-100b-47bc-83ab-a1a376a57c4d.png", // New profile picture
  "/lovable-uploads/5f0cfdc2-dcf5-478a-9921-45b10bdd2329.png", // Newly added image
  "/lovable-uploads/b59af0c8-288a-4cbd-a048-ee0e8fedf214.png", // Added new layout image
  "/lovable-uploads/98ca8be9-0a4e-4fc3-ac34-c2614e0074ad.png", // Contact form reference image
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
    
    // Load Calendly script for the CTA button
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://assets.calendly.com/assets/external/widget.js';
    scriptElement.async = true;
    document.body.appendChild(scriptElement);
    
    // Cleanup on component unmount
    return () => {
      if (document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
      
      // Remove any Calendly badges that might have been created
      const badges = document.querySelectorAll('.calendly-badge-widget');
      badges.forEach(badge => {
        if (badge.parentNode) {
          badge.parentNode.removeChild(badge);
        }
      });
    };
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
        useCalendly={true}
      />
      <Footer />
    </div>
  );
};

export default AIVoiceChat;

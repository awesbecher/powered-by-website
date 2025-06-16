
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/voice-business/page-sections/HeroSection";
import { FeaturesSection } from "@/components/voice-business/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/voice-business/page-sections/BenefitsSection";
import { FAQSection } from "@/components/voice-business/page-sections/FAQSection";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { properties } from "@/data/properties";
import { forcePrefetchImages, addCSSImagePreloading } from "@/components/voice-chat/utils/imageUtils";
import { getCalApi } from "@calcom/embed-react";

const propertyImages = properties.map(property => property.image);
const otherImages = [
  "/assets/images/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png",  // Logo
  "/assets/images/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png", // Agent image
  "/assets/images/314cb21d-7fdb-4cdd-a44e-da8af003a7f9.png", // Phoenix Realty Inc. Logo
  "/assets/images/b73aa6e5-5a81-4225-a13d-a2b900e9c3c7.png", // New uploaded logo
  "/assets/images/4bf8609b-100b-47bc-83ab-a1a376a57c4d.png", // New profile picture
  "/assets/images/5f0cfdc2-dcf5-478a-9921-45b10bdd2329.png", // Newly added image
  "/assets/images/b59af0c8-288a-4cbd-a048-ee0e8fedf214.png", // Added new layout image
  "/assets/images/98ca8be9-0a4e-4fc3-ac34-c2614e0074ad.png", // Contact form reference image
];
const allImages = [...propertyImages, ...otherImages];
forcePrefetchImages(allImages);
addCSSImagePreloading(allImages);

const AIVoiceBusinessLines = () => {
  const [initialLoad, setInitialLoad] = useState(false); // Start as false to skip animation
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set to false immediately to avoid any initial load animation
    setInitialLoad(false);
    
    // Initialize Cal.com with the direct approach
    (async function() {
      try {
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
        
        // Preload the calendar link
        cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
      } catch (error) {
        console.error("Error initializing Cal.com in AIVoiceBusinessLines:", error);
      }
    })();
  }, []);

  const handleContact = async () => {
    try {
      // Get fresh instance of Cal API
      const cal = await getCalApi({"namespace":"get-started-today"});
      
      // Configure UI
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
      
      // Directly open the calendar modal
      cal("modal", { calLink: "team-powered-by-dfbtbb/get-started-today" });
      console.log("Cal.com modal opened from AIVoiceBusinessLines");
    } catch (error) {
      console.error("Failed to open Cal.com modal from AIVoiceBusinessLines:", error);
      // Fallback to contact page if Cal.com fails
      navigate("/contact");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#0f0f0f]">
      <Navbar />
      <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
      <FeaturesSection />
      <BenefitsSection />
      <FAQSection />
      <ClosingCTA 
        customHeading="Ready to Implement AI Voice Assistants for Your Business?"
        customButtonText="Get Started"
        useCalendly={true}
        externalLink={null}
      />
      <Footer />
    </div>
  );
};

export default AIVoiceBusinessLines;

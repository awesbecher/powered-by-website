
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { HeroSection } from "@/components/voice-chat/page-sections/HeroSection";
import { FeaturesSection } from "@/components/voice-chat/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/voice-chat/page-sections/BenefitsSection";
import { CTASection } from "@/components/voice-chat/page-sections/CTASection";
import { FinalCTASection } from "@/components/voice-chat/page-sections/FinalCTASection";
import { FAQSection } from "@/components/voice-chat/page-sections/FAQSection";
import { HowItWorksSection } from "@/components/voice-chat/page-sections/HowItWorksSection";
import { TestimonialsSection } from "@/components/voice-chat/page-sections/TestimonialsSection";
import { getCalApi } from "@calcom/embed-react";

const AIVoiceChat = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  useEffect(() => {
    setInitialLoad(false);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initialize Cal.com with robust error handling
    (async function initializeCalcom() {
      try {
        console.log("Initializing Cal.com embed in AIVoiceChat page");
        
        // Ensure script is loaded
        await loadCalComScript();
        
        const cal = await getCalApi({"namespace":"get-started-with-voice-ai-chat"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        
        console.log("Cal.com embed initialized successfully in AIVoiceChat page");
      } catch (error) {
        console.error("Error initializing Cal.com embed in AIVoiceChat page:", error);
      }
    })();
  }, []);
  
  // Helper function to ensure Cal.com script is loaded
  const loadCalComScript = () => {
    return new Promise<void>((resolve, reject) => {
      // If script already exists, resolve immediately
      if (document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) {
        console.log("Cal.com script already loaded");
        resolve();
        return;
      }
      
      console.log("Loading Cal.com script");
      const script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      script.onload = () => {
        console.log("Cal.com script loaded successfully");
        resolve();
      };
      script.onerror = (error) => {
        console.error("Failed to load Cal.com script:", error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  };
  
  const handleContact = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cmw-whg-d7n?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=6342ff'
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>
      
      <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
      
      <FeaturesSection />
      
      <HowItWorksSection />
      
      <BenefitsSection />
      
      <TestimonialsSection />
      
      <FAQSection />
      
      <FinalCTASection />
      
      <Footer />

      {/* Background decorations */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20 pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20 pointer-events-none z-0" />
    </div>
  );
};

export default AIVoiceChat;

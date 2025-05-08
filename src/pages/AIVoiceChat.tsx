import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/voice-chat/page-sections/HeroSection";
import { FeaturesSection } from "@/components/voice-chat/page-sections/FeaturesSection";
import { BenefitsSection } from "@/components/voice-chat/page-sections/BenefitsSection";
import { CTASection } from "@/components/voice-chat/page-sections/CTASection";
import { FinalCTASection } from "@/components/voice-chat/page-sections/FinalCTASection";
import { FAQSection } from "@/components/voice-chat/page-sections/FAQSection";
import { HowItWorksSection } from "@/components/voice-chat/page-sections/HowItWorksSection";
import { TestimonialsSection } from "@/components/voice-chat/page-sections/TestimonialsSection";
import { VideoIntroSection } from "@/components/voice-chat/page-sections/VideoIntroSection";
import { useCalendarInitialization, openCalendarModal } from "@/utils/calendarUtils";

const AIVoiceChat = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Use the centralized calendar initialization hook
  useCalendarInitialization("get-started-today");
  
  useEffect(() => {
    setInitialLoad(false);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleContact = () => {
    // Use the centralized openCalendarModal function
    if (!openCalendarModal("team-powered-by-dfbtbb/get-started-with-voice-ai-chat")) {
      console.error("Failed to open Cal.com modal for voice-ai-chat, no fallback available");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>
      
      <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
      
      <VideoIntroSection />
      
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
      
      {/* Hidden Cal.com button that will be triggered programmatically if needed */}
      <button
        id="cal-button-global"
        data-cal-namespace="get-started-today"
        data-cal-link="team-powered-by-dfbtbb/get-started-with-voice-ai-chat"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
      ></button>
    </div>
  );
};

export default AIVoiceChat;

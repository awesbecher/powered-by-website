import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/text-agent/page-sections/HeroSection';
import { FeaturesSection } from '@/components/text-agent/page-sections/FeaturesSection';
import { BenefitsSection } from '@/components/text-agent/page-sections/BenefitsSection';
import { FAQSection } from '@/components/text-agent/page-sections/FAQSection';
import { FinalCTASection } from '@/components/text-agent/page-sections/FinalCTASection';
import { HowItWorksSection } from '@/components/text-agent/page-sections/HowItWorksSection';
import { useCalendarInitialization, openCalendarModal } from "@/utils/calendarUtils";

const TextAgent = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Use the centralized calendar initialization hook
  useCalendarInitialization();
  
  // Remove initialLoad state after component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle contact button clicks using centralized utility
  const handleContact = () => {
    console.log("Contact button clicked - triggering Cal.com");
    if (!openCalendarModal("team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents")) {
      console.error("Failed to open Cal.com modal for text agent");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        
        {/* Main content sections */}
        <div className="container mx-auto px-4">
          {/* Feature Highlights */}
          <FeaturesSection />
          
          {/* How It Works */}
          <HowItWorksSection />
          
          {/* Benefits */}
          <BenefitsSection />
          
          {/* FAQ Section */}
          <FAQSection />
          
          {/* Final CTA */}
          <FinalCTASection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TextAgent;

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/text-agent/page-sections/HeroSection';
import { FeaturesSection } from '@/components/text-agent/page-sections/FeaturesSection';
import { BenefitsSection } from '@/components/text-agent/page-sections/BenefitsSection';
import { FAQSection } from '@/components/text-agent/page-sections/FAQSection';
import { FinalCTASection } from '@/components/text-agent/page-sections/FinalCTASection';
import { HowItWorksSection } from '@/components/text-agent/page-sections/HowItWorksSection';
import { getCalApi } from "@calcom/embed-react";

const TextAgent = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Handle contact button clicks
  const handleContact = () => {
    // This function is maintained for compatibility with other components
  };
  
  // Remove initialLoad state after component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"get-started-with-ai-sms-text-agents"});
      cal("ui", {
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

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

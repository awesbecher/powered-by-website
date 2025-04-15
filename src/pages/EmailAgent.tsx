
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/email-agent/page-sections/HeroSection';
import { FeaturesSection } from '@/components/email-agent/page-sections/FeaturesSection';
import { BenefitsSection } from '@/components/email-agent/page-sections/BenefitsSection';
import { FAQSection } from '@/components/email-agent/page-sections/FAQSection';
import { CTASection } from '@/components/email-agent/page-sections/CTASection';
import { FinalCTASection } from '@/components/email-agent/page-sections/FinalCTASection';
import { getCalApi } from "@calcom/embed-react";

const EmailAgent = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
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
      const cal = await getCalApi({"namespace":"get-started-with-voice-ai-chat"});
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand":"#292929"},
          "dark": {"cal-brand":"#fafafa"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);
  
  // Handle contact button clicks
  const handleContact = () => {
    // This function is maintained for compatibility with other components
    // but we're no longer using Calendly's popup widget
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      <main>
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        <div className="container mx-auto px-4">
          <FeaturesSection />
          <BenefitsSection />
          <FAQSection />
          <CTASection handleContact={handleContact} />
          <FinalCTASection handleContact={handleContact} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmailAgent;


import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/email-agent/page-sections/HeroSection';
import { FeaturesSection } from '@/components/email-agent/page-sections/FeaturesSection';
import { HowItWorksSection } from '@/components/email-agent/page-sections/HowItWorksSection';
import { ROISection } from '@/components/email-agent/page-sections/ROISection';
import { FAQSection } from '@/components/email-agent/page-sections/FAQSection';
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
      const cal = await getCalApi({"namespace":"get-started-with-ai-email-agents"});
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
  
  // Handle contact button clicks - direct Cal.com button trigger approach
  const handleContact = () => {
    console.log("Contact button clicked - triggering Cal.com");
    const calButton = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-email-agents"]');
    if (calButton instanceof HTMLElement) {
      calButton.click();
    } else {
      console.error("Cal.com button not found in DOM");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      <main>
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        <FeaturesSection />
        <HowItWorksSection />
        <ROISection />
        <FAQSection />
        <FinalCTASection handleContact={handleContact} />
      </main>
      <Footer />
    </div>
  );
};

export default EmailAgent;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/email-agent/page-sections/HeroSection';
import { FeaturesSection } from '@/components/email-agent/page-sections/FeaturesSection';
import { HowItWorksSection } from '@/components/email-agent/page-sections/HowItWorksSection';
import { ROISection } from '@/components/email-agent/page-sections/ROISection';
import { FAQSection } from '@/components/email-agent/page-sections/FAQSection';
import { FinalCTASection } from '@/components/email-agent/page-sections/FinalCTASection';
import { useCalendarInitialization, openCalendarModal } from "@/utils/calendarUtils";

const EmailAgent = () => {
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
    if (!openCalendarModal("team-powered-by-dfbtbb/get-started-with-ai-email-agents")) {
      console.error("Failed to open Cal.com modal for email agent");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <Helmet>
        <title>AI Email Agent for SMBs | Automate Customer Email Communication</title>
        <meta name="description" content="Deploy AI Email Agents to effortlessly handle customer inquiries, automate personalized follow-ups, and boost customer engagement." />
        <link rel="canonical" href="https://www.poweredby.agency/email-agent" />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        <FeaturesSection />
        <HowItWorksSection />
        <ROISection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default EmailAgent;

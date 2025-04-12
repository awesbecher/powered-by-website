
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/email-agent/page-sections/HeroSection';
import { FeaturesSection } from '@/components/email-agent/page-sections/FeaturesSection';
import { BenefitsSection } from '@/components/email-agent/page-sections/BenefitsSection';
import { FAQSection } from '@/components/email-agent/page-sections/FAQSection';
import { CTASection } from '@/components/email-agent/page-sections/CTASection';
import { FinalCTASection } from '@/components/email-agent/page-sections/FinalCTASection';

const EmailAgent = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Handle contact button clicks
  const handleContact = () => {
    // Open Calendly or perform other contact actions
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/poweredby/demo'
      });
    }
  };
  
  // Remove initialLoad state after component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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


import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/virtual-se/HeroSection';
import ContentSections from '@/components/virtual-se/ContentSections';
import CTASection from '@/components/virtual-se/CTASection';

const VirtualSE = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Handle contact button clicks
  const handleContact = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cnbc-rvx-4vd?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=ff0025'
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
        <ContentSections initialLoad={initialLoad} />
        <CTASection handleContact={handleContact} />
      </main>
      <Footer />
    </div>
  );
};

export default VirtualSE;

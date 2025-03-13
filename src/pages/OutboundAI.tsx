
import React, { useState, useEffect } from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/outbound-ai/HeroSection';
import ContentSections from '@/components/outbound-ai/ContentSections';
import CTASection from '@/components/outbound-ai/CTASection';

const OutboundAI = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleContact = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <main className="flex-grow">
        <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
        <ContentSections initialLoad={initialLoad} />
        <CTASection handleContact={handleContact} />
      </main>
      <Footer />
    </div>
  );
};

export default OutboundAI;

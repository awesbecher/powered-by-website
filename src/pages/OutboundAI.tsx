
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContact = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Background image at the top */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/lovable-uploads/6c3f7264-17ad-411e-a2f3-69970fa1948a.png" 
          alt="Person with headphones at computer" 
          className="w-full h-[60vh] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/80 via-[#2f1c4a] to-[#1a0b2e]"></div>
      </div>

      {/* Content container with higher z-index */}
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <div className="pt-12 pb-12">
          <div className="max-w-7xl mx-auto">
            <HeroSection initialLoad={initialLoad} handleContact={handleContact} />
            <ContentSections initialLoad={initialLoad} />
            <CTASection handleContact={handleContact} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default OutboundAI;

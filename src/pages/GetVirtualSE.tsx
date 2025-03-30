
import React, { useState, useEffect } from 'react';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/virtual-se/HeroSection';
import ContentSections from '@/components/virtual-se/ContentSections';
import CTASection from '@/components/virtual-se/CTASection';
import VirtualSENavbar from '@/components/virtual-se/VirtualSENavbar';

const GetVirtualSE = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleContact = () => {
    // Use Calendly popup instead
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/teampoweredby/powered_by-demo-virtual-se?hide_gdpr_banner=1'
      });
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Background image at the top */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/lovable-uploads/c86cda73-fde4-4673-92c8-fd650286b9e6.png" 
          alt="Team planning at whiteboard" 
          className="w-full h-[60vh] object-cover object-center"
        />
        {/* Changed the background gradient from purple to black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black to-black"></div>
      </div>

      {/* Content container with higher z-index */}
      <div className="relative z-10 min-h-screen">
        <VirtualSENavbar />
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

export default GetVirtualSE;


import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/outbound-ai/HeroSection';
import { ContentSections } from '@/components/outbound-ai/ContentSections';
import { CTASection } from '@/components/outbound-ai/CTASection';

const OutboundAI = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      <main>
        <HeroSection />
        <ContentSections />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default OutboundAI;


import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection } from '@/components/text-agent/page-sections/HeroSection';
import { FeaturesSection } from '@/components/text-agent/page-sections/FeaturesSection';
import { BenefitsSection } from '@/components/text-agent/page-sections/BenefitsSection';
import { FAQSection } from '@/components/text-agent/page-sections/FAQSection';
import { CTASection } from '@/components/text-agent/page-sections/CTASection';
import { FinalCTASection } from '@/components/text-agent/page-sections/FinalCTASection';

const TextAgent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4">
          <FeaturesSection />
          <BenefitsSection />
          <FAQSection />
          <CTASection />
          <FinalCTASection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TextAgent;

import React from 'react';
import { HeroSection } from '@/components/mercedes-dealer/HeroSection';
import { ServicesGrid } from '@/components/mercedes-dealer/ServicesGrid';
import { MetricsSection } from '@/components/mercedes-dealer/MetricsSection';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

const MercedesDealer = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesGrid />
        <MetricsSection />
      </main>
      <Footer />
    </div>
  );
};

export default MercedesDealer;

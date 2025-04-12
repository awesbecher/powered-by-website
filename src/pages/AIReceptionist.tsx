
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HeroSection as VoiceChatHeroSection } from '@/components/voice-chat/page-sections/HeroSection';

const AIReceptionist = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="py-12">
          <h1 className="text-5xl font-bold text-white text-center mb-6">AI Receptionist</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-8">
            Intelligent virtual receptionists for your business. Our AI receptionists handle calls, 
            schedule appointments, and answer customer inquiries 24/7 with human-like conversation capabilities.
          </p>
        </div>
        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Coming Soon</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're currently developing our AI Receptionist solution. Check back soon for more information or contact us for early access.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIReceptionist;

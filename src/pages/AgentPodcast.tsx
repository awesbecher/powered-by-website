
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AgentPodcast: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="min-h-[60vh]">
        {/* Content will be added later */}
      </div>
      <Footer />
    </div>
  );
};

export default AgentPodcast;

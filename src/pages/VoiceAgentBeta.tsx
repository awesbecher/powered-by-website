
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VoiceAgentInterface from '@/components/voice-agent-beta/VoiceAgentInterface';

const VoiceAgentBeta = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Voice Agent Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">AI Voice Agent</h1>
            <p className="text-gray-300 text-lg">
              Ask questions using your voice and receive spoken responses from our AI assistant.
            </p>
          </div>
          
          {/* Voice Agent Interface Component */}
          <VoiceAgentInterface />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VoiceAgentBeta;

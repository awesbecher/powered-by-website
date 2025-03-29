
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
            <div className="inline-block bg-purple-600/20 border border-purple-500/40 rounded-lg px-4 py-1 mb-4">
              <span className="text-purple-300 font-semibold">Beta Feature</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">AI Voice Agent</h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Ask questions using your voice and receive spoken responses from our AI assistant. Our voice agent uses real-time speech recognition, a specialized knowledge base, and natural text-to-speech to provide accurate and helpful information.
            </p>
          </div>
          
          {/* Voice Agent Interface Component */}
          <VoiceAgentInterface />
          
          {/* Additional Information */}
          <div className="mt-12 text-center text-gray-400 text-sm max-w-2xl mx-auto">
            <h3 className="text-white text-lg font-medium mb-2">How it works:</h3>
            <p className="mb-2">
              1. Click the microphone and speak your question clearly
            </p>
            <p className="mb-2">
              2. Our AI transcribes your speech and searches our knowledge base
            </p>
            <p className="mb-2">
              3. A tailored response is generated based on relevant information
            </p>
            <p>
              4. The AI speaks back to you with a natural-sounding voice
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VoiceAgentBeta;

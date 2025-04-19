
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChatInterface } from "@/components/custom-gpt/ChatInterface";
import { AudioPlayer } from "@/components/AudioPlayer";
import { VoiceSelector } from "@/components/custom-gpt/VoiceSelector";

const CustomGPT = () => {
  const [audioData, setAudioData] = useState<string | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check for pageState on window and update local state
    if (window.pageState?.audioBlob) {
      setAudioData(window.pageState.audioBlob);
    }
  }, []);

  // Update local state when window.pageState.audioBlob changes
  useEffect(() => {
    const handlePageStateChange = () => {
      if (window.pageState?.audioBlob) {
        setAudioData(window.pageState.audioBlob);
      }
    };

    // Create custom event listener to detect changes to pageState
    window.addEventListener('pageStateUpdated', handlePageStateChange);

    return () => {
      window.removeEventListener('pageStateUpdated', handlePageStateChange);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="pt-12 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 leading-tight">
              Voice Agent <span className="text-[#9b87f5]">GPT Assistant</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Chat with our AI assistant to learn more about voice agent technology and how it can transform your business communications.
            </p>
          </div>

          {/* Chat interface */}
          <div className="mt-8">
            <ChatInterface />
          </div>
          
          {/* Voice Selection and Audio Player */}
          <div className="mt-6 space-y-4">
            <VoiceSelector />
            <AudioPlayer base64Audio={audioData} />
          </div>
          
          {/* Additional information section */}
          <div className="mt-16 bg-[#1a0b2e]/30 border border-white/5 rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">About This Assistant</h2>
            <p className="text-gray-300 mb-4">
              This AI assistant is powered by OpenAI's GPT technology and specializes in voice agent implementation,
              best practices, and use cases across various industries. Feel free to ask about:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Voice AI technology capabilities and limitations</li>
              <li>Implementation strategies for your business</li>
              <li>Industry-specific use cases</li>
              <li>Best practices for voice agent design</li>
              <li>Integration with existing systems</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomGPT;


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { WebsiteSimulation } from "@/components/voice-chat/WebsiteSimulation";
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";
import { HeroContent } from "./components/HeroContent";
import { FeaturesList } from "./components/FeaturesList";
import { VoiceChatControls } from "./components/VoiceChatControls";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const handleVoiceChatClick = () => {
    // Find and click the hidden button in VoiceChatControls
    const triggerButton = document.getElementById('voice-chat-trigger');
    if (triggerButton) {
      triggerButton.click();
    }
  };

  const handleGetStarted = () => {
    // Scroll to the Tally form
    const formContainer = document.querySelector('.tally-form-container');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
        <HeroContent 
          initialLoad={initialLoad}
          handleVoiceChatClick={handleVoiceChatClick}
          handleGetStarted={handleGetStarted}
        />
        
        <div className={`transition-all duration-1000 delay-300 ease-out transform
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <div className="bg-[#121212] border border-gray-800 shadow-xl overflow-hidden rounded-lg">
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#222] border-b border-gray-800 py-3 px-4">
              <h3 className="text-lg font-semibold text-white">Get Started Today</h3>
            </div>
            <div className="p-0">
              <TallyFormEmbed 
                formId="nG5kAZ" 
                className="min-h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="flex flex-col lg:flex-row items-start gap-12 justify-between">
          <FeaturesList initialLoad={initialLoad} />
          <div className={`w-full lg:w-[50%] lg:ml-auto transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <WebsiteSimulation />
          </div>
        </div>
      </div>

      {/* Include the VoiceChatControls component */}
      <VoiceChatControls source="voice-chat" />
    </section>
  );
};


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { WebsiteSimulation } from "@/components/voice-chat/WebsiteSimulation";
import { VoiceAgentContactForm } from "@/components/voice-chat/VoiceAgentContactForm";
import { HeroContent } from "./components/HeroContent";
import { FeaturesList } from "./components/FeaturesList";
import { VoiceChatControls } from "./components/VoiceChatControls";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  const handleVoiceChatClick = () => {
    // Find and click the hidden button in VoiceChatControls
    const triggerButton = document.getElementById('voice-chat-trigger');
    if (triggerButton) {
      triggerButton.click();
    }
  };

  const handleGetStarted = () => {
    if (firstNameInputRef.current) {
      firstNameInputRef.current.focus();
      firstNameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
          <VoiceAgentContactForm firstNameInputRef={firstNameInputRef} />
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

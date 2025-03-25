
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { WebsiteSimulation } from "@/components/voice-chat/WebsiteSimulation";
import { HeroContent } from "./components/HeroContent";
import { FeaturesList } from "./components/FeaturesList";
import { VoiceChatControls } from "./components/VoiceChatControls";
import { CTACard } from "./components/CTACard";

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
    // Navigate to contact page
    handleContact();
  };

  return (
    <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left side - Hero content */}
        <div className="lg:col-span-7">
          <HeroContent 
            initialLoad={initialLoad}
            handleVoiceChatClick={handleVoiceChatClick}
            handleGetStarted={handleGetStarted}
          />
        </div>
        
        {/* Right side - CTA Card */}
        <div className="lg:col-span-5 flex items-center">
          <CTACard 
            initialLoad={initialLoad} 
            handleGetStarted={handleGetStarted} 
          />
        </div>
      </div>

      <div className="mb-10">
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

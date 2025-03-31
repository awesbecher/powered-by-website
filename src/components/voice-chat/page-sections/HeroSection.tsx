
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { WebsiteSimulation } from "@/components/voice-chat/WebsiteSimulation";
import { HeroContent } from "./components/HeroContent";
import { FeaturesList } from "./components/FeaturesList";
import { VoiceChatControls } from "./components/VoiceChatControls";
import { CalendlyButton } from "@/components/contact/CalendlyButton";

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left side - Hero content */}
        <div className="lg:col-span-7">
          <HeroContent 
            initialLoad={initialLoad}
            handleVoiceChatClick={handleVoiceChatClick}
            handleGetStarted={handleGetStarted}
          />
          
          {/* Feature list now under the hero content */}
          <div className="mt-8">
            <FeaturesList initialLoad={initialLoad} compact={true} />
          </div>
        </div>
        
        {/* Right side - Website Simulation with centered CalendlyButton */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full relative">
            {/* Website Simulation */}
            <div className={`w-full transition-all duration-1000 delay-500 ease-out transform
              ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <WebsiteSimulation />
            </div>
            
            {/* Calendly Button positioned to align with the middle of the simulation */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 w-full max-w-[90%] transition-all duration-1000 delay-300 ease-out
              ${initialLoad ? 'opacity-0' : 'opacity-100'}`}>
              <CalendlyButton />
            </div>
          </div>
        </div>
      </div>

      {/* Include the VoiceChatControls component */}
      <VoiceChatControls source="voice-chat" />
    </section>
  );
};

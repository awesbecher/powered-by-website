
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { WebsiteSimulation } from "@/components/voice-chat/WebsiteSimulation";
import { HeroContent } from "./components/HeroContent";
import { FeaturesList } from "./components/FeaturesList";
import { VoiceChatControls } from "./components/VoiceChatControls";
import { CalendarButton } from "./components/CalendarButton";
import { getCalApi } from "@calcom/embed-react";

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

  // Initialize Cal.com embed
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"get-started-with-voice-ai-chat"});
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand":"#292929"},
          "dark": {"cal-brand":"#fafafa"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

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
        
        {/* Right side - Website Simulation with Calendly button on top */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full relative">
            {/* Calendly Button positioned with reduced spacing */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 -top-[2rem] z-10 text-center transition-all duration-1000 delay-300 ease-out
              ${initialLoad ? 'opacity-0' : 'opacity-100'}`}>
              <button 
                data-cal-namespace="get-started-with-voice-ai-chat"
                data-cal-link="team-powered-by-dfbtbb/get-started-with-voice-ai-chat"
                data-cal-config='{"layout":"month_view"}'
                className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-6 py-4 text-base rounded-md flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                Get Started Now!
              </button>
            </div>
            
            {/* Website Simulation with reduced top margin */}
            <div className={`w-full mt-8 transition-all duration-1000 delay-500 ease-out transform
              ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <WebsiteSimulation />
            </div>
          </div>
        </div>
      </div>

      {/* Include the VoiceChatControls component */}
      <VoiceChatControls source="voice-chat" />
    </section>
  );
};

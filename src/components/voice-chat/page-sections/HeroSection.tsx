import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeroVoiceEmbedSimulator } from "@/components/voice-chat/hero/HeroVoiceEmbedSimulator";
import { HeroContent } from "./components/HeroContent";
import { FeaturesList } from "./components/FeaturesList";
import { VoiceChatControls } from "./components/VoiceChatControls";
import { getCalApi } from "@calcom/embed-react";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  // Initialize Cal.com embed with robust error handling
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in VoiceChat HeroSection");
        
        // Ensure script is loaded
        await loadCalComScript();
        
        const cal = await getCalApi();
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        
        console.log("Cal.com embed initialized successfully in VoiceChat HeroSection");
      } catch (error) {
        console.error("Error initializing Cal.com embed in VoiceChat HeroSection:", error);
      }
    })();
  }, []);

  const loadCalComScript = async () => {
    return new Promise((resolve, reject) => {
      try {
        const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
        if (existingScript) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://app.cal.com/embed/embed.js';
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load Cal.com script'));
        document.body.appendChild(script);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div>
            <HeroContent initialLoad={initialLoad} handleContact={handleContact} />
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="lg:absolute lg:inset-0 lg:left-12 flex items-center">
              <div className="w-full max-w-lg mx-auto">
                <HeroVoiceEmbedSimulator />
              </div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-16">
          <FeaturesList initialLoad={initialLoad} />
        </div>

        {/* Voice Chat Controls */}
        <div className="mt-8">
          <VoiceChatControls />
        </div>
      </div>
    </section>
  );
};

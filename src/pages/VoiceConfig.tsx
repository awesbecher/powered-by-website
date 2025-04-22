
import React, { useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VoiceConfigContent from "@/components/voice-config/VoiceConfigContent";

const VoiceConfig = () => {
  // Inject PlayHT Web SDK and initialization scripts
  useEffect(() => {
    // First script for PlayHT Web SDK
    const sdkScript = document.createElement('script');
    sdkScript.type = 'text/javascript';
    sdkScript.src = 'https://cdn.jsdelivr.net/npm/@play-ai/agent-web-sdk@ht';
    sdkScript.async = true;
    document.head.appendChild(sdkScript);

    // Second script for agent initialization
    const initScript = document.createElement('script');
    initScript.type = 'text/javascript';
    initScript.innerHTML = `
      addEventListener("load", () => {
        PlayAI.open('QkoU6baIf2yLhMgZbsdhA');
      });
    `;
    document.head.appendChild(initScript);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.head.removeChild(sdkScript);
      document.head.removeChild(initScript);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F9F9FB]">
      <Navbar />
      <VoiceConfigContent />
      <Footer />
    </div>
  );
};

export default VoiceConfig;

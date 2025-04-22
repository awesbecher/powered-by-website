
import React, { useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VoiceConfigContent from "@/components/voice-config/VoiceConfigContent";

const VoiceConfig = () => {
  // Inject PlayHT script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://play.ht/widgets/agent.js';
    script.setAttribute('agent-id', 'YOUR_AGENT_ID'); // Replace with your actual agent ID
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
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

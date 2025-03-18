
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { HeroSection } from "@/components/voiceagent-config-end/HeroSection";
import { NextStepsSection } from "@/components/voiceagent-config-end/NextStepsSection";

const VoiceAgentConfigEnd = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="pt-12 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <HeroSection initialLoad={initialLoad} />
          <NextStepsSection initialLoad={initialLoad} />
        </div>
      </div>
      <ClosingCTA />
      <Footer />
    </div>
  );
};

export default VoiceAgentConfigEnd;

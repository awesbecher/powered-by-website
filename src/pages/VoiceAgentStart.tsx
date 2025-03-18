
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { HeroSection } from "@/components/voiceagent-start/HeroSection";
import { IntroSection } from "@/components/voiceagent-start/IntroSection";
import { SetupSteps } from "@/components/voiceagent-start/SetupSteps";
import Footer from "@/components/layout/Footer";

const VoiceAgentStart = () => {
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
          
          <div className="relative mt-8">
            <div className="mx-auto max-w-6xl">
              {/* Two-column layout for intro text and timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 pr-0 lg:pr-10">
                  <IntroSection initialLoad={initialLoad} />
                </div>

                <div className="lg:col-span-7">
                  <SetupSteps />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClosingCTA />
      <Footer />
    </div>
  );
};

export default VoiceAgentStart;

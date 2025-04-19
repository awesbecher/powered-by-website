
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/sections/HeroSection";
import { HowItWorks } from "@/components/home/sections/HowItWorks";
import { UseCaseGrid } from "@/components/home/sections/UseCaseGrid";
import { ResultsSection } from "@/components/home/sections/ResultsSection";
import { AudioDemo } from "@/components/home/sections/AudioDemo";
import { FinalCTA } from "@/components/home/sections/FinalCTA";
import { getCalApi } from "@calcom/embed-react";

const Index = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    
    // Initialize Cal.com
    (async function () {
      try {
        console.log("Initializing Cal.com embed at Index page level");
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully at Index page level");
      } catch (error) {
        console.error("Error initializing Cal.com embed at Index page level:", error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>
      
      <main>
        <HeroSection />
        <HowItWorks />
        <UseCaseGrid />
        <ResultsSection />
        <AudioDemo />
        <FinalCTA />
      </main>

      <Footer />
      
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Index;

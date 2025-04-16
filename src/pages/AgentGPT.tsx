
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GPTHeroSection } from "@/components/gpt-landing/GPTHeroSection";
import { GPTFeaturesSection } from "@/components/gpt-landing/GPTFeaturesSection";
import { GPTScreenshotsSection } from "@/components/gpt-landing/GPTScreenshotsSection";
import { GPTEmailSection } from "@/components/gpt-landing/GPTEmailSection";

const AgentGPT = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="pt-12 pb-24">
        <GPTHeroSection initialLoad={initialLoad} />
        <GPTFeaturesSection initialLoad={initialLoad} />
        <GPTScreenshotsSection initialLoad={initialLoad} />
        <GPTEmailSection initialLoad={initialLoad} />
      </div>
      <Footer />
    </div>
  );
};

export default AgentGPT;


import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AgentBuilder } from "@/components/agent-gpt-builder/AgentBuilder";
import { Toaster } from "@/components/ui/toaster";

const AgentGPTBuilder = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    window.scrollTo(0, 0);

    // Ensure Tally is loaded
    if (window.Tally) {
      window.Tally.loadEmbeds();
    } else {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.Tally) {
          window.Tally.loadEmbeds();
        }
      };
      document.body.appendChild(script);
    }
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="pt-6 pb-16 px-4">
        <AgentBuilder initialLoad={initialLoad} />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default AgentGPTBuilder;

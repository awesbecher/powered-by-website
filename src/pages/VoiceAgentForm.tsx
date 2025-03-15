
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const VoiceAgentForm = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card rounded-xl p-4 md:p-8 max-w-5xl mx-auto">
          {/* Tally.so form embed */}
          <div className="w-full h-[800px] md:h-[700px] relative">
            <iframe 
              data-tally-src="https://tally.so/r/nG5kAZ"
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="AI Voice Agent Configurator"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Gradient orbs for visual interest */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      
      <Footer />
    </div>
  );
};

export default VoiceAgentForm;

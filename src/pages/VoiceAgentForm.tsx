
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const VoiceAgentForm = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Tally.so form will be embedded here */}
        <div className="glass-card rounded-xl p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
            Voice Agent Setup Form
          </h1>
          
          {/* Placeholder for the Tally.so form */}
          <div className="min-h-[400px] flex items-center justify-center">
            <p className="text-gray-300">Tally.so form will be embedded here</p>
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

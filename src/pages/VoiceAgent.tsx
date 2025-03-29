
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";

const VoiceAgent = () => {
  const navigate = useNavigate();

  const handleStartSetup = () => {
    navigate("/voiceagent-start");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#0f0f0f]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Voice Agent Platform</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Create powerful voice AI agents for your business that can understand and respond to your customers naturally.
          </p>
          <button
            onClick={handleStartSetup}
            className="px-8 py-3 bg-[#9b87f5] hover:bg-[#8a75e3] text-white rounded-md text-lg font-medium"
          >
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VoiceAgent;

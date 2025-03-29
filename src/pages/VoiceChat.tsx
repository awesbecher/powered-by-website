
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";

const VoiceChat = () => {
  const navigate = useNavigate();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // After initial render, set initialLoad to false to trigger animations
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#0f0f0f]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="text-4xl font-bold text-white mb-8">Voice Chat</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Connect with our AI voice assistant for a more natural conversation experience.
          </p>
          <button
            onClick={handleContact}
            className="px-8 py-3 bg-[#9b87f5] hover:bg-[#8a75e3] text-white rounded-md text-lg font-medium"
          >
            Get Started
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VoiceChat;

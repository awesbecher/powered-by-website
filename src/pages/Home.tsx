import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import { GlobalVoiceChatDialog } from "@/components/shared/GlobalVoiceChatDialog";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>
      
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
          Welcome to Our AI Agents Platform
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Explore our range of AI agents designed to enhance your business communications.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/ai-receptionist"
            className="bg-[#6342ff] hover:bg-[#5335d5] text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            AI Receptionist
          </Link>
          <Link
            to="/voice-chat"
            className="bg-[#9b87f5] hover:bg-[#8977e0] text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Voice Chat
          </Link>
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('open-voice-dialog'))}
            className="border-2 border-[#6342ff] text-white hover:bg-[#6342ff]/20 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Try Voice Agent Now
          </button>
        </div>
      </div>
      
      <Footer />
      
      <GlobalVoiceChatDialog />
    </div>
  );
};

export default Home;

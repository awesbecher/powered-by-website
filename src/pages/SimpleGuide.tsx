
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";

const SimpleGuide = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Simple Guide
          </h1>
          
          <div className="bg-[#2a1a47]/40 border border-[#9b87f5]/30 rounded-xl p-8 backdrop-blur-md">
            <iframe 
              src="https://gamma.app/embed/w4kxpq0y38i7xqu" 
              className="w-full h-[450px] md:h-[500px] lg:h-[550px]"
              allow="fullscreen" 
              title="Simple Guide to AI Agents">
            </iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SimpleGuide;

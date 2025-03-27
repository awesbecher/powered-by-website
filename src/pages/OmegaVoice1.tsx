
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const OmegaVoice1 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center mb-12">
          <img 
            src="/lovable-uploads/2855384c-487c-46d3-90a0-b663019ac215.png" 
            alt="Omega Pediatrics - Accessibility & Love" 
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
        
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-3xl font-bold text-white mb-6">Welcome to Omega Voice</h1>
          <p className="text-gray-300 text-center max-w-2xl">
            Content will be added soon. This page is under construction.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OmegaVoice1;

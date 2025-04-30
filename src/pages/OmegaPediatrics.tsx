
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/omega/LoginForm";

const OmegaPediatrics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/images/2855384c-487c-46d3-90a0-b663019ac215.png" 
            alt="Omega Pediatrics - Accessibility & Love" 
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
        
        <div className="py-4">
          <LoginForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OmegaPediatrics;

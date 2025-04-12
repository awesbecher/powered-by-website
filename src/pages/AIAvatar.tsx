
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AIAvatar = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Content will be added later */}
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAvatar;

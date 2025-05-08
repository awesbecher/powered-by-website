import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCalendarInitialization, openCalendarModal } from "@/utils/calendarUtils";

const CustomAISolutions = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Use the centralized calendar initialization hook
  useCalendarInitialization();
  
  // Remove initialLoad state after component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle contact button clicks using centralized utility
  const handleContact = () => {
    console.log("Contact button clicked - triggering Cal.com");
    if (!openCalendarModal("team-powered-by-dfbtbb/get-started-with-ai-agents")) {
      console.error("Failed to open Cal.com modal for AI agents");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      <main>
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-4xl font-bold text-white mb-6 md:text-5xl lg:text-6xl">
              Custom AI Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Intelligent AI agents tailored specifically for your business needs - voice, chat, email, and text solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleContact}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Get Started
              </button>
              <a 
                href="/demo" 
                className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-400 text-white font-medium rounded-lg"
              >
                View Demos
              </a>
            </div>
          </div>

          {/* Simple Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/60 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our AI Solutions</h2>
              <p className="text-gray-300 mb-4">
                We build custom AI agents that transform how businesses interact with their customers. Our solutions are designed to be seamlessly integrated with your existing systems and workflows.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-slate-800/60 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Voice AI</h3>
                <p className="text-gray-300">Natural-sounding voice agents that handle calls and customer inquiries 24/7.</p>
              </div>
              
              <div className="bg-slate-800/60 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Chat AI</h3>
                <p className="text-gray-300">Intelligent chatbots for your website that engage visitors and answer questions instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomAISolutions;

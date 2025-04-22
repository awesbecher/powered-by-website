import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TechnicalFeatureItem } from "./technical/TechnicalFeatureItem";
import { technicalFeaturesData } from "./technical/TechnicalFeaturesData";
import ArchitectureFlow from "./technical/ArchitectureFlow";

export const TechnicalSection = () => {
  const handleCalendarClick = () => {
    console.log("Technical Section CTA clicked");
    try {
      (window as any).Cal?.('ui', {
        styles: { branding: { brandColor: '#6342ff' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      (window as any).Cal?.('showModal', {
        calLink: "team-powered-by-dfbtbb/get-started-today",
        config: {
          layout: 'month_view',
        },
      });
    } catch (err) {
      console.error("Failed to open Cal.com modal from Technical Section:", err);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute right-0 bottom-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6342ff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#9b87f5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,100 L100,0 L100,100 L0,100 Z" fill="url(#techGradient)"></path>
        </svg>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] bg-clip-text text-transparent">
            How Our AI Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A peek behind the scenes of our advanced AI architecture that powers seamless, human-like interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Flow Diagram */}
          <div className="bg-[#1a0f2e]/60 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 relative">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl">
              <div className="w-[400px] h-[400px] rounded-full bg-[#6342ff]/5 blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-white">
                AI Agent Architecture
              </h3>
              
              <ArchitectureFlow />
            </div>
          </div>
          
          {/* Key Technical Features */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">
              Technical Capabilities
            </h3>
            
            <div className="space-y-6">
              {technicalFeaturesData.map((feature, index) => (
                <TechnicalFeatureItem
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
            
            <div className="mt-10">
              <Button 
                data-cal-link="team-powered-by-dfbtbb/get-started-today"
                onClick={handleCalendarClick}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl border border-gray-700"
              >
                Schedule a Technical Walkthrough
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

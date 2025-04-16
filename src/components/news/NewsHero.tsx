
import React from "react";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { motion } from "framer-motion";

export const NewsHero = () => {
  return (
    <div className="relative">
      {/* Background image with improved overlay */}
      <div className="absolute inset-0 z-0 h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/80 via-[#1a0b2e]/90 to-[#1a0b2e] z-10"></div>
        <img 
          src="/lovable-uploads/a53ff8c8-9033-4442-8c48-6cde96e79af7.png"
          alt="Printing press in motion" 
          className="w-full h-full object-cover object-center opacity-40" 
        />
      </div>
      
      {/* Header content */}
      <header className="relative z-10 py-20 pt-36 pb-24 text-center">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white">Stay Informed with </span> 
            <span className="text-[#9b87f5]"><PoweredByText /> News</span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed text-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Get the latest updates on AI innovations, product launches, and industry insights
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Latest Updates</span>
            </div>
          </motion.div>
        </div>
      </header>
    </div>
  );
};

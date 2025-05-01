import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import { openPlayHtAgent } from './PlayHtAgent';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/auto-showroom.jpg"
          alt="Auto Showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-transparent"></div>
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-[5rem] leading-tight font-extrabold"
          >
            <span className="text-[#8B5CF6]">AI Agents</span> for<br />
            Auto Dealers
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-700 text-xl md:text-2xl max-w-2xl mx-auto"
          >
            Transform your dealership with intelligent AI agents that handle inquiries,
            schedule test drives, and qualify leads 24/7.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4"
          >
            <button
              onClick={openPlayHtAgent}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white 
                bg-[#8B5CF6] rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 
                transform transition-all duration-200 ease-out"
            >
              Talk to an Auto Dealer Agent
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

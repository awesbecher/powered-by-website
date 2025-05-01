import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/auto-dealer-hero.jpg"
          alt="Auto Dealership"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Transform Your Dealership
            <br />
            with AI Voice Agents
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
            Automate customer inquiries, schedule test drives, and qualify leads 24/7 with our intelligent AI voice agents.
          </p>
          <button
            className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { HeroVoiceEmbedSimulator } from '../hero/HeroVoiceEmbedSimulator';
import { Menu, Search, ShoppingCart } from 'lucide-react';

export const WebsiteSimulator: React.FC = () => {
  return (
    <div className="w-full h-[700px] bg-gray-100 rounded-xl overflow-hidden shadow-2xl border border-gray-200">
      {/* Navbar */}
      <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Menu className="w-6 h-6 text-gray-600" />
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Company
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 text-gray-600" />
          <ShoppingCart className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Main content */}
      <div className="h-[calc(100%-4rem)] overflow-y-auto">
        {/* Hero section */}
        <div className="relative h-[450px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10" />
          <div className="relative h-full max-w-6xl mx-auto px-6 py-12 flex items-center justify-between">
            <div className="w-[55%]">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white mb-6"
              >
                Transform Your Site<br />
                With Voice AI
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-300 mb-8 max-w-xl"
              >
                Experience how natural voice interactions can enhance your website. Try our demo with Michael, your AI assistant.
              </motion.p>
            </div>
            
            {/* Voice chat demo with CTA */}
            <div className="w-[320px]">
              <div className="relative">
                {/* Browser frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -inset-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                />
                <div className="scale-90 origin-top-right">
                  <HeroVoiceEmbedSimulator />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content sections (blurred/dimmed to focus on the voice chat) */}
        <div className="max-w-6xl mx-auto px-6 py-12 opacity-40">
          <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-white rounded-lg shadow-sm p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 mb-4" />
                <div className="h-3 w-2/3 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, MessageCircle, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ initialLoad }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleTalkToAgent = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4 text-[#9b87f5] border border-[#9b87f5]/30"
          >
            AI Agent Solutions Built For Small & Medium Businesses
          </motion.div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            <span className="text-gradient">Why should those Silicon Valley nerds have all the fancy AI toys?</span>
          </h1>
          
          <motion.p 
            className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            SMBs generate 43.5% of U.S. GDP & employ about 46% of all private-sector workers. Powered_by's mission is to empower this critically important sector by delivery cutting-edge AI agent solutions that can transform the way businesses work, communicate, & engage customers.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md group"
              >
                Transform Your Business Today
                <ArrowRightIcon className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button 
              onClick={handleTalkToAgent}
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-[#9b87f5] text-white hover:bg-[#9b87f5]/20 px-8 py-6 text-lg rounded-md group"
            >
              <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" />
              Talk to AI Agent
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 flex justify-center items-center"
          >
            <button 
              className="flex items-center text-white/80 hover:text-white transition-colors"
              onClick={() => document.getElementById('approach')?.scrollIntoView({behavior: 'smooth'})}
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                <Play size={16} className="text-[#9b87f5] ml-1" />
              </div>
              <span>See how we work</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </section>
  );
};

export default HeroSection;

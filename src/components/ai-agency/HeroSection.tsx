
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ initialLoad }) => {
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
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            <span className="text-gradient">Why should those Silicon Valley nerds have all the fancy AI toys?</span>{' '}
            <span className="block mt-2">AI Agency For The Digital Age</span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We build and deploy custom AI agents to enhance your business operations and customer experience.
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
                className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
              >
                Get Started Today
                <ArrowRightIcon className="ml-2" />
              </Button>
            </Link>
            
            <Button 
              onClick={handleTalkToAgent}
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-[#9b87f5] text-white hover:bg-[#9b87f5]/20 px-8 py-6 text-lg rounded-md"
            >
              Talk to AI Agent
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

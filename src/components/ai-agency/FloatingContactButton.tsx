
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, X } from 'lucide-react';

export const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Only show button after scrolling down a bit
  const showButton = scrollPosition > 300;
  
  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
              isOpen ? 'bg-gray-700' : 'bg-[#9b87f5]'
            } transition-colors duration-300`}
          >
            {isOpen ? <X className="text-white" /> : <Calendar className="text-white" />}
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute bottom-16 right-0 bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-lg shadow-xl w-64"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-white text-sm mb-4">
                  Ready to transform your business with AI?
                </div>
                <div className="space-y-2">
                  <Link 
                    to="/contact"
                    className="block w-full py-2 px-4 bg-[#9b87f5] text-white text-center rounded-md hover:bg-[#8b77e5] transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Schedule a Meeting
                  </Link>
                  <button 
                    onClick={() => {
                      document.dispatchEvent(new CustomEvent('open-voice-dialog'));
                      setIsOpen(false);
                    }}
                    className="block w-full py-2 px-4 bg-transparent border border-[#9b87f5] text-white text-center rounded-md hover:bg-[#9b87f5]/20 transition-colors duration-200"
                  >
                    Talk to AI Agent
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

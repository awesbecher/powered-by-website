
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ScrollNav = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Top' },
    { id: 'what-is-ai-agency', label: 'About' },
    { id: 'how-different', label: 'Difference' },
    { id: 'approach', label: 'Approach' },
    { id: 'partnership', label: 'Partnership' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: id === 'hero' ? 0 : element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="flex flex-col items-center space-y-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group relative flex items-center"
            aria-label={`Scroll to ${section.label} section`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-[#9b87f5] scale-125'
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
            />
            <span
              className={`absolute left-6 text-sm whitespace-nowrap transition-all duration-300 ${
                activeSection === section.id
                  ? 'opacity-100 text-[#9b87f5]'
                  : 'opacity-0 group-hover:opacity-100 text-gray-300'
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};


import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ initialLoad }) => {
  const handleTalkToAgent = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h1 
            className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-1000 delay-100 ${
              initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            <span className="text-gradient">AI Agency</span>{' '}
            <span className="block mt-2">For The Digital Age</span>
          </h1>
          
          <p 
            className={`text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 transition-all duration-1000 delay-300 ${
              initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            We build and deploy custom AI agents to enhance your business operations and customer experience.
          </p>
          
          <div 
            className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-500 ${
              initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
              >
                Get Started
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
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

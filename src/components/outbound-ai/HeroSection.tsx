
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  return (
    <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="relative overflow-hidden px-6 lg:px-8 pt-12 pb-8">
        <div className="mx-auto max-w-4xl">
          <div className={`w-full lg:w-2/3 space-y-6 transition-all duration-1000 ease-out transform mx-auto
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <h1 className="text-center">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#9b87f5] block">
                OutboundAI
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                AI Voice Agents for Outbound Sales & Marketing
              </span>
            </h1>
            <p className="text-xl text-gray-300 text-center">
              Transform high-volume outbound calling with AI voice agents that scale, personalize outreach, cut costs, and sound & act astonishing human-like.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <a 
                href="#learn-more"
                className="order-2 sm:order-1"
              >
                <Button 
                  className="bg-white hover:bg-gray-100 text-[#6342ff] w-full sm:w-auto flex items-center"
                >
                  <FileText className="mr-2 h-5 w-5" /> Learn More
                </Button>
              </a>
              <Link to="/contact" className="order-1 sm:order-2">
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center w-full sm:w-auto"
                  onClick={handleContact}
                >
                  Schedule a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>
    </section>
  );
};

export default HeroSection;

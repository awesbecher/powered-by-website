
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="relative overflow-hidden px-6 lg:px-8 pt-12 pb-8">
        <div className="mx-auto max-w-4xl">
          <div className={`w-full lg:w-2/3 space-y-6 transition-all duration-1000 ease-out transform mx-auto
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight text-center">
              <span className="text-[#9b87f5] block">Virtual SE</span>
              Force-Multiply Your Sales Engineering Team
            </h1>
            <p className="text-xl text-gray-300 text-center">
              Meet <strong>Virtual SE</strong>. An AI-driven voice and email agent solution designed to offload busy SE teams by supporting sales reps in pre-sales meetings, demos, and qualification calls. Deploy into Zoom, Google Meet, Slack, & more.
            </p>
            <div className="flex justify-center mt-4">
              <Link to="/contact">
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
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

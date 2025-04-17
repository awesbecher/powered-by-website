
import React from "react";
import { AboutPageButtons } from "@/components/home/AboutPageButtons";
import { Sparkles, LineChart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AboutHeroProps {
  initialLoad: boolean;
  onScrollToSection: (ref: React.RefObject<HTMLElement>) => void;
  whoWeAreRef: React.RefObject<HTMLElement>;
}

export const AboutHero = ({ initialLoad, onScrollToSection, whoWeAreRef }: AboutHeroProps) => {
  return (
    <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative">
      <div className={`text-center transition-all duration-1000 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        
        <Badge className="mb-6 px-4 py-1.5 text-sm border-purple-400/30 bg-purple-400/10 text-purple-200">
          Our Story
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="text-white">Powered</span>
            <span className="text-[#9b87f5]">_</span>
            <span className="text-white">by AI Agents</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">Run</span>
            <span className="text-[#9b87f5]">_</span>
            <span className="text-white">by Small Business</span>
          </div>
        </h1>
        
        <div className="mt-8 mb-10">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're building a future where small and mid-sized businesses have access to the same AI superpowers as tech giants—custom, affordable, and ready to use today.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/20 via-transparent to-[#9b87f5]/20 blur-xl opacity-30 -z-10"></div>
          <AboutPageButtons onScrollToSection={onScrollToSection} sectionRef={whoWeAreRef} />
        </div>
      </div>
    </section>
  );
};

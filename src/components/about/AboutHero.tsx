
import React from "react";
import { AboutPageButtons } from "@/components/home/AboutPageButtons";

interface AboutHeroProps {
  initialLoad: boolean;
  onScrollToSection: (ref: React.RefObject<HTMLElement>) => void;
  whoWeAreRef: React.RefObject<HTMLElement>;
}

export const AboutHero = ({ initialLoad, onScrollToSection, whoWeAreRef }: AboutHeroProps) => {
  return (
    <section className="pt-16 pb-6 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className={`text-center transition-all duration-1000 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 flex flex-col items-center">
          <div className="flex items-center">
            <span className="text-white">
              Powered
            </span>
            <span className="text-[#9b87f5] text-5xl md:text-6xl">_</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#d4d4d4]">
              by
            </span>
            <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#d4d4d4]">
              AI
            </span>
          </div>
          <div className="flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#d4d4d4]">
              Run
            </span>
            <span className="text-[#9b87f5] text-5xl md:text-6xl">_</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#d4d4d4]">
              by
            </span>
            <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#d4d4d4]">
              small business
            </span>
          </div>
        </h1>
        <div className="mt-8 mb-6 flex justify-center">
          <p className="text-xl bg-white text-[#6342ff] font-bold px-4 py-2 rounded-md inline-block backdrop-blur-sm shadow-lg">
            Our mission: to democratize access to AI agents for SMBs.
          </p>
        </div>
        
        <AboutPageButtons onScrollToSection={onScrollToSection} sectionRef={whoWeAreRef} />
      </div>
    </section>
  );
};

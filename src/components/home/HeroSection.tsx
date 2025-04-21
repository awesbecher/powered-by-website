
import React from 'react';

interface HeroSectionProps {
  subtitle?: string;
  initialLoad?: boolean;
}

export const HeroSection = ({ subtitle, initialLoad }: HeroSectionProps) => {
  return (
    <section className="text-center py-16 px-4 max-w-4xl mx-auto">
      {/* Fancy AI-styled title with better readability */}
      <h1 className="relative mb-6">
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold block">
          Custom{" "}
          <span className="text-[#9b87f5] inline-block">
            AI Agents
          </span>
        </span>
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white block mt-1">
          for SMBs
        </span>
        
        {/* Decorative underline */}
        <svg
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 md:w-1/2 opacity-70 pointer-events-none"
          height="12"
          viewBox="0 0 420 12"
          fill="none"
        >
          <path
            d="M5 8C122 4 295 4 415 8"
            stroke="#9b87f5"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </h1>

      {/* Clear, readable subtext */}
      <p className="text-xl md:text-2xl text-white font-medium max-w-xl mx-auto">
        {subtitle
          ? subtitle
          : "Super-smart AI Agents That Talk, Text & Email. Go Live Fast. Scale Even Faster."
        }
      </p>
    </section>
  );
};

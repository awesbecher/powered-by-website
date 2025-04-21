
import React from 'react';

interface HeroSectionProps {
  subtitle?: string;
  initialLoad?: boolean;
}

export const HeroSection = ({ subtitle, initialLoad }: HeroSectionProps) => {
  return (
    <section className="text-center py-16 px-4 max-w-4xl mx-auto">
      {/* Fancy AI-styled title */}
      <h1
        className="text-5xl md:text-6xl lg:text-7xl font-black fancy-title ebook-title-glow text-gradient mb-6 relative"
        style={{
          lineHeight: 1.15,
        }}
      >
        <span className="relative z-10">
          Custom <span className="text-[#9b87f5] drop-shadow-[0_2px_24px_rgba(155,135,245,0.5)]">AI Agents</span>
          <span className="block mt-1">for SMBs</span>
        </span>
        {/* Optional subtle background AI effect */}
        <svg
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 md:w-1/2 opacity-50 pointer-events-none"
          height="18"
          viewBox="0 0 420 18"
          fill="none"
        >
          <path
            d="M5 14C122 7 295 7 415 14"
            stroke="#9b87f5"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.27"
          />
        </svg>
      </h1>

      {/* Fancy subtext styling, with text shadow and slightly larger size */}
      <p className="text-xl md:text-2xl text-gray-300 high-contrast-text text-shadow max-w-xl mx-auto">
        {subtitle
          ? subtitle
          : "Super-smart AI Agents That Talk, Text & Email. Go Live Fast. Scale Even Faster."
        }
      </p>
    </section>
  );
};


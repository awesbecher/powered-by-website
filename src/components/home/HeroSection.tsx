
import React from 'react';

interface HeroSectionProps {
  subtitle?: string;
  initialLoad?: boolean;
}

export const HeroSection = ({ subtitle, initialLoad }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden px-6 lg:px-8 pt-20 pb-12 mx-auto max-w-7xl">
      <div className="text-center relative z-10">
        <h1
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4"
        >
          Custom AI Agents for{" "}
          <span className="text-[#9b87f5]">SMBs</span>
        </h1>
        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Super-smart AI Agents That Talk, Text, &amp; Email. Go Live Fast. Scale Even Faster.
        </p>
      </div>
    </section>
  );
};

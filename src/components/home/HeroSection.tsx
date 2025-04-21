
import React from 'react';

interface HeroSectionProps {
  subtitle?: string;
  initialLoad?: boolean;
}

export const HeroSection = ({ subtitle, initialLoad }: HeroSectionProps) => {
  return (
    <section className="text-center py-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-5xl font-extrabold text-white mb-6">Custom AI Agents for SMBs</h1>
      {subtitle && (
        <p className="text-xl text-gray-300 max-w-lg mx-auto">
          {subtitle}
        </p>
      )}
      {!subtitle && (
        <p className="text-xl text-gray-300 max-w-lg mx-auto">
          Super-smart AI Agents That Talk, Text & Email. Go Live Fast. Scale Even Faster.
        </p>
      )}
    </section>
  );
};

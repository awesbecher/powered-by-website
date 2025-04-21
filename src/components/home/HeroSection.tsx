
import React from 'react';

interface HeroSectionProps {
  subtitle?: string;
}

export const HeroSection = ({ subtitle }: HeroSectionProps) => {
  return (
    <section className="text-center py-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-5xl font-extrabold text-white mb-6">Your AI Agent Solution</h1>
      {subtitle && (
        <p className="text-xl text-gray-300 max-w-lg mx-auto">
          {subtitle}
        </p>
      )}
    </section>
  );
};


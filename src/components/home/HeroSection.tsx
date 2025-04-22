
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  subtitle?: string;
  initialLoad?: boolean;
}

export const HeroSection = ({ subtitle, initialLoad }: HeroSectionProps) => {
  // Animation (optional slight delay fade-in)
  const [loaded, setLoaded] = useState(!initialLoad);

  useEffect(() => {
    if (initialLoad) {
      const timer = setTimeout(() => setLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [initialLoad]);

  return (
    <section
      className="relative overflow-hidden min-h-[82vh] flex items-center justify-center px-6"
      aria-label="Hero Section"
      style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #6342ff 50%, #4c3698 100%)"
      }}
    >
      {/* Subtle textured overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.11) 0%, rgba(124,58,237,0.04) 80%, transparent 100%)"
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center pt-20 pb-16">
        {/* Logo or badge (if present) */}
        {/* <img src="/lovable-uploads/64bb9d7d-aaaa-4015-9a4b-839ae9f0114d.png" alt="" className="mb-6 w-32 h-auto" /> */}

        {/* Main Headline */}
        <h1
          className={
            `text-center font-extrabold text-white drop-shadow-[0_2px_6px_rgba(99,66,255,0.09)] transition-all duration-700
                  ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  text-4xl md:text-6xl lg:text-7xl tracking-tight`
          }
        >
          AI Agents<br />
          <span className="bg-gradient-to-r from-[#ffd700] to-[#9b87f5] bg-clip-text text-transparent">
            for Modern SMBs
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={
            "mt-6 text-center text-lg md:text-2xl text-gray-100/90 font-medium max-w-2xl mx-auto transition-all duration-700 delay-100 " +
            (loaded ? "opacity-80 translate-y-0" : "opacity-0 translate-y-8")
          }
        >
          Super-smart voice, text & email AI Agents that answer, engage, and convert your leads 24/7. No code required.
        </p>

        {/* CTA Buttons - prominent and clear */}
        <div
          className={
            "mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center transition-all duration-700 delay-200 " +
            (loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")
          }
        >
          <Link to="/demo" className="w-full sm:w-auto">
            <button
              className="px-8 py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-[#ffd700] to-[#9b87f5] shadow-lg hover:from-[#ffe873] hover:to-[#6342ff] transition-all duration-200 w-full sm:w-auto"
              tabIndex={0}
            >
              Try Demos
            </button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <button
              className="px-8 py-4 rounded-full text-lg font-bold text-white bg-white/10 border border-white/30 shadow-md hover:bg-white/20 transition-all duration-200 w-full sm:w-auto"
              tabIndex={0}
            >
              Talk to an AI Agent now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

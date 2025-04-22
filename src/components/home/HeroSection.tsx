
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * HeroSection: Visually mimics the "Cluely" hero with blue gradient, vertical lines,
 * and glow effect. Content remains the same.
 */
interface HeroSectionProps {
  subtitle?: string;
  initialLoad?: boolean;
}

export const HeroSection = ({ subtitle, initialLoad }: HeroSectionProps) => {
  // Animation for fade-in
  const [loaded, setLoaded] = useState(!initialLoad);

  useEffect(() => {
    if (initialLoad) {
      const timer = setTimeout(() => setLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [initialLoad]);

  return (
    <section
      className="relative flex items-center justify-center min-h-[82vh] px-6"
      aria-label="Hero Section"
      style={{
        // Roughly replicate the "Cluely" blue background
        // The image will be used as a fallback, but the main effect comes from gradients and overlays below
        background:
          "linear-gradient(180deg, #1e267f 0%, #171233 80%)"
      }}
    >
      {/* Fixed: vertically striped overlay, mimics Cluely's lines */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
        {/* Main blue gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #1b266e 0%, #1d1a38 100%)"
          }}
        />
        {/* Vertical lines (SVG as background) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              `repeating-linear-gradient(90deg,rgba(82,128,255,0.09) 0px,rgba(82,128,255,0.09) 1.5px,transparent 1.5px,transparent 96px)`,
            opacity: 0.9
          }}
        />
        {/* Purple-pink soft glow at the bottom */}
        <div 
          className="absolute left-1/2 bottom-0 -translate-x-1/2"
          style={{
            width: "90vw",
            height: "180px",
            background: "radial-gradient(ellipse at center bottom, rgba(181,108,255,0.25), rgba(158,70,252,0.16), transparent 90%)"
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center pt-20 pb-16">
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

        {/* CTA Buttons */}
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


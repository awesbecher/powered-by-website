
import React from 'react';
import { Sparkles, CircuitBoard } from "lucide-react";

interface HeroSectionProps {
  subtitle?: string;
  initialLoad?: boolean;
}

export const HeroSection = ({ subtitle, initialLoad }: HeroSectionProps) => {
  return (
    <section className="relative text-center py-20 px-4 max-w-4xl mx-auto overflow-visible">
      {/* --- AI Glow & Techy Circuit BG --- */}
      <div className="absolute inset-0 left-1/2 -translate-x-1/2 pointer-events-none z-0 max-w-screen">
        {/* Soft Glow */}
        <div
          aria-hidden
          className="absolute left-1/2 top-24 -translate-x-1/2 w-[440px] h-[220px] md:w-[680px] md:h-[340px] rounded-full bg-gradient-to-br from-[#9b87f5aa] via-[#6342ff66] to-transparent blur-2xl opacity-80 animate-pulse"
          style={{ filter: "blur(40px)" }}
        />
        {/* Circuit SVG overlay */}
        <svg
          viewBox="0 0 750 200"
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[90vw] max-w-[750px] h-[200px] opacity-40 select-none"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="ai-circuit-gradient" x1="0" x2="750" y1="0" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#b7a9ff" />
              <stop offset="0.9" stopColor="#9b87f5" />
            </linearGradient>
          </defs>
          <g stroke="url(#ai-circuit-gradient)" strokeWidth="1.4">
            <rect x="30" y="40" width="120" height="40" rx="12" />
            <rect x="200" y="100" width="90" height="32" rx="10" />
            <rect x="350" y="60" width="50" height="60" rx="12" />
            <rect x="470" y="120" width="150" height="40" rx="18" />
            <circle cx="100" cy="150" r="18"/>
            <circle cx="600" cy="70" r="22"/>
            {/* connections */}
            <path d="M100 80 Q105 120 100 150" />
            <path d="M180 120 L200 116" />
            <path d="M290 116 L350 120" />
            <path d="M375 60 Q410 40 600 70" />
            <path d="M400 120 Q470 160 470 140" />
          </g>
        </svg>
      </div>

      {/* --- Hero Main Title --- */}
      <h1 className="relative z-10 mb-10 font-sans leading-tight">
        <span
          className="block text-[3rem] sm:text-[4rem] lg:text-[5rem] font-extrabold tracking-tight drop-shadow-md"
        >
          <span 
            className="inline-block text-[#14142b] dark:text-white/95"
          >
            Custom{" "}
          </span>
          <span
            className="relative px-2 text-transparent bg-gradient-to-r from-[#a899ee] via-[#9b87f5] to-[#6242ff] bg-clip-text animate-aiShimmer shadow-lg"
            style={{
              WebkitTextStroke: "1.3px #9b87f5aa",
              filter: "drop-shadow(0 5px 20px #9b87f5bb)",
            }}
          >
            AI Agents
            <span className="absolute -top-8 left-1 animate-fade-in md:block hidden">
              <Sparkles className="w-10 h-10 text-[#b7a9ff] opacity-90 animate-float" />
            </span>
          </span>
          <span className="block mt-4 font-extrabold tracking-wider text-[#d6bcfa] drop-shadow-md text-[2.8rem] sm:text-[3.3rem] lg:text-[4.5rem]">
            for <span className="text-[#9b87f5]">SMBs</span>
          </span>
        </span>

        {/* Fancy AI underline */}
        <span className="block mx-auto mt-5 w-[63%] md:w-[33%]">
          <svg height="20" viewBox="0 0 320 16" fill="none">
            <path
              d="M8 12C87 5 232 3 312 12"
              stroke="#9b87f5"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.75"
            />
          </svg>
        </span>
      </h1>

      {/* --- Hero Subtext --- */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <p
          className={[
            "text-xl sm:text-2xl md:text-3xl font-semibold max-w-2xl mx-auto leading-relaxed",
            "bg-gradient-to-r from-[#d6bcfa] via-[#9b87f5] to-[#6242ff] bg-clip-text text-transparent",
            "drop-shadow-[0_3px_15px_rgba(155,135,245,0.7)] tracking-wide animate-fade-in",
          ].join(' ')}
          style={{
            textShadow: "0 2px 12px rgba(99,66,255,0.35), 0 0 1.5px #e2d7ff",
          }}
        >
          {subtitle
            ? subtitle
            : "Super-smart AI Agents That Talk, Text & Email. Go Live Fast. Scale Even Faster."
          }
        </p>
      </div>
      {/* --- Example AI Icon Overlay for Fun --- */}
      <CircuitBoard className="absolute right-3 bottom-3 hidden sm:block text-[#9b87f5]/50 opacity-50 w-14 h-14 z-0" />
      <style>{`
        @keyframes aiShimmer {
          0% {
            background-position: -120% 0;
          }
          100% {
            background-position: 320% 0;
          }
        }
        .animate-aiShimmer {
          background-size: 300% 100%;
          animation: aiShimmer 2.7s linear infinite;
        }
      `}</style>
    </section>
  );
};


import React from "react";

const AIAgentIllustration = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 to-transparent rounded-3xl"></div>
      <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-[#8B5CF6]/30 via-purple-900/20 to-transparent p-8 backdrop-blur-sm border border-white/10 relative overflow-hidden">
        {/* Center glowing orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#8B5CF6] opacity-30 blur-xl"></div>
        
        {/* Animated central element */}
        <div className="animate-pulse w-16 h-16 rounded-full bg-[#8B5CF6]/50 mx-auto mb-8 relative z-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
        </div>
        
        {/* Animated circular rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-[#8B5CF6]/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-[#8B5CF6]/10 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#8B5CF6]/5 rounded-full animate-pulse" style={{ animationDuration: '6s' }}></div>
        
        {/* "Digital" lines */}
        <div className="space-y-4 mt-16 relative z-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-2 bg-white/10 rounded w-full md:w-3/4 mx-auto"></div>
          ))}
          
          {[1, 2].map((i) => (
            <div key={i + 3} className="h-2 bg-white/5 rounded w-1/2 mx-auto"></div>
          ))}
        </div>
        
        {/* Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#8B5CF6]/70 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 rounded-full bg-[#8B5CF6]/60 animate-pulse" style={{ animationDuration: '2.5s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-[#8B5CF6]/50 animate-pulse" style={{ animationDuration: '3s' }}></div>
      </div>
    </div>
  );
};

export default AIAgentIllustration;

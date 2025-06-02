
import React from "react";
import { BellRing, Sparkles, RefreshCw } from "lucide-react";

export const UseCaseExplainer: React.FC = () => {
  return (
    <div className="py-12 bg-[#1a0b2e]/40 border-t border-b border-white/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">What It Can Do</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#222222]/60 p-6 rounded-lg border border-white/10 flex flex-col items-center text-center">
            <div className="bg-[#9b87f5]/20 p-4 rounded-full mb-4">
              <BellRing className="h-8 w-8 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Orders & Reorders</h3>
            <p className="text-white/70">Food, towels, amenities delivered to your room on request.</p>
          </div>
          
          <div className="bg-[#222222]/60 p-6 rounded-lg border border-white/10 flex flex-col items-center text-center">
            <div className="bg-[#9b87f5]/20 p-4 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Housekeeping</h3>
            <p className="text-white/70">Room cleaning, turn-down service, and additional supplies.</p>
          </div>
          
          <div className="bg-[#222222]/60 p-6 rounded-lg border border-white/10 flex flex-col items-center text-center">
            <div className="bg-[#9b87f5]/20 p-4 rounded-full mb-4">
              <RefreshCw className="h-8 w-8 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Routing</h3>
            <p className="text-white/70">Escalates to staff or external systems when needed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

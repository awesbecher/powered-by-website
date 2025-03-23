
import React from "react";
import { Star } from "lucide-react";

export const SocialProofSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-[#1a0b2e] via-[#2f1c4a]/80 to-[#1a0b2e] border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center mb-2">
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
            </div>
            <span className="text-white text-lg font-medium">4.9/5 Rating</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4">
            <span className="font-bold text-white text-2xl mb-2">50+</span>
            <span className="text-gray-300">SMBs Powered</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4">
            <span className="font-bold text-white text-2xl mb-2">$2M</span>
            <span className="text-gray-300">in revenue generated</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4">
            <span className="font-bold text-white text-2xl mb-2">96%</span>
            <span className="text-gray-300">customer satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

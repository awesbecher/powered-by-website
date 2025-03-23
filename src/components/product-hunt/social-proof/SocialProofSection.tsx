
import React from "react";
import { Star } from "lucide-react";

export const SocialProofSection = () => {
  return (
    <section className="py-6 bg-gradient-to-r from-[#1a0b2e] via-[#2f1c4a]/80 to-[#1a0b2e] border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center py-2">
            <div className="flex items-center mb-1">
              <Star className="text-yellow-400 w-5 h-5 mr-1" fill="#facc15" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" fill="#facc15" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" fill="#facc15" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" fill="#facc15" />
              <div className="relative w-5 h-5 mr-1">
                <Star className="text-yellow-400 w-5 h-5 absolute top-0 left-0" />
                <div className="absolute top-0 left-0 w-3/4 h-5 overflow-hidden">
                  <Star className="text-yellow-400 w-5 h-5" fill="#facc15" />
                </div>
              </div>
            </div>
            <span className="text-white text-lg font-medium">4.75/5 Rating</span>
          </div>
          
          <div className="flex flex-col items-center justify-center py-2">
            <span className="font-bold text-white text-2xl mb-1">50+</span>
            <span className="text-gray-300">SMBs Powered_by</span>
          </div>
          
          <div className="flex flex-col items-center justify-center py-2">
            <span className="font-bold text-white text-2xl mb-1">$2M</span>
            <span className="text-gray-300">in revenue generated</span>
          </div>
          
          <div className="flex flex-col items-center justify-center py-2">
            <span className="font-bold text-white text-2xl mb-1">96%</span>
            <span className="text-gray-300">customer satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

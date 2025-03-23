
import React from "react";
import { Star } from "lucide-react";

export const SocialProofSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-[#1a0b2e] via-[#2f1c4a]/80 to-[#1a0b2e] border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center">
            <Star className="text-yellow-400 w-5 h-5 mr-1" />
            <Star className="text-yellow-400 w-5 h-5 mr-1" />
            <Star className="text-yellow-400 w-5 h-5 mr-1" />
            <Star className="text-yellow-400 w-5 h-5 mr-1" />
            <Star className="text-yellow-400 w-5 h-5 mr-1" />
            <span className="text-white ml-2 text-sm">4.9/5 Rating</span>
          </div>
          <div className="text-gray-300 text-sm">
            <span className="font-bold text-white">50+</span> SMBs Powered
          </div>
          <div className="text-gray-300 text-sm">
            <span className="font-bold text-white">$2M</span> in revenue generated
          </div>
          <div className="text-gray-300 text-sm">
            <span className="font-bold text-white">96%</span> customer satisfaction
          </div>
        </div>
      </div>
    </section>
  );
};

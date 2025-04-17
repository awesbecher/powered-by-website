
import React from "react";

interface SocialProofSectionProps {
  initialLoad?: boolean;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = () => {
  return (
    <div className="bg-[#1a0b2e]/60 py-8">
      <div className="container mx-auto">
        <p className="text-center text-white/70 mb-6">Trusted by top dealers like...</p>
        
        <div className="flex justify-center space-x-8 mb-8">
          {/* Placeholder logos */}
          <div className="w-32 h-12 bg-gray-500/30 rounded flex items-center justify-center">
            <span className="text-gray-400 font-semibold">LOGO 1</span>
          </div>
          <div className="w-32 h-12 bg-gray-500/30 rounded flex items-center justify-center">
            <span className="text-gray-400 font-semibold">LOGO 2</span>
          </div>
          <div className="w-32 h-12 bg-gray-500/30 rounded flex items-center justify-center">
            <span className="text-gray-400 font-semibold">LOGO 3</span>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/90 italic text-lg">
            "Our service team saved 20 hours a week overnight. Customers think it's a real person."
          </p>
          <p className="text-white/70 mt-2">— General Manager, Mercedes Dealer</p>
        </div>
      </div>
    </div>
  );
};

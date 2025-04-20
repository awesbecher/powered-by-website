
import React from "react";

interface SocialProofSectionProps {
  initialLoad?: boolean;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = () => {
  return (
    <div className="bg-[#1a0b2e]/60 py-8">
      <div className="container mx-auto">
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

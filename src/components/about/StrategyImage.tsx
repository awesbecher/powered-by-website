
import React from "react";

interface StrategyImageProps {
  initialLoad: boolean;
}

export const StrategyImage = ({ initialLoad }: StrategyImageProps) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-2xl mx-auto mb-10">
        <div className={`transition-all duration-1000 ease-out transform rounded-xl overflow-hidden shadow-xl
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <img 
            src="/lovable-uploads/03b82838-fbc0-4056-8cec-062f897f47dd.png" 
            alt="AI workflow strategy planning" 
            className="w-full object-cover rounded-xl"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

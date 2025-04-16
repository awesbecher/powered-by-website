
import React from "react";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import "@/components/ui/animations.css";

interface StrategyImageProps {
  initialLoad: boolean;
}

export const StrategyImage = ({ initialLoad }: StrategyImageProps) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-2xl mx-auto mb-10">
        <div className={`transition-all duration-1000 ease-out transform rounded-xl overflow-hidden shadow-xl
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <OptimizedImage 
            src="/lovable-uploads/1eda3529-e1b0-45f1-badb-0d5917c2438e.png" 
            alt="AI Agent Architecture whiteboard - Strategic planning and system design" 
            className="w-full object-cover rounded-xl animate-fade-in delay-300"
          />
        </div>
      </div>
    </div>
  );
};

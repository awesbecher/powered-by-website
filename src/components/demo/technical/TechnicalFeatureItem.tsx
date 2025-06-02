
import React from "react";

interface TechnicalFeatureItemProps {
  title: string;
  description: string;
}

export const TechnicalFeatureItem = ({ title, description }: TechnicalFeatureItemProps) => {
  return (
    <div className="bg-[#1a0f2e]/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-[#6342ff]/50 transition-all duration-300">
      <h4 className="text-xl font-bold text-white mb-3 flex items-center">
        <span className="inline-block w-6 h-6 rounded-full bg-[#6342ff] mr-3"></span>
        {title}
      </h4>
      <p className="text-gray-300 pl-9">
        {description}
      </p>
    </div>
  );
};

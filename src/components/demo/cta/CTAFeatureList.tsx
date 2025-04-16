
import React from "react";

interface CTAFeatureListProps {
  features: string[];
}

export const CTAFeatureList = ({ features }: CTAFeatureListProps) => {
  return (
    <ul className="mt-10 space-y-2 text-sm">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-400">
          <svg className="w-5 h-5 mr-1.5 text-[#9b87f5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
  );
};


import React from "react";
import { Check } from "lucide-react";

interface BenefitItemProps {
  title: string;
  description: string;
}

export const BenefitItem = ({ title, description }: BenefitItemProps) => {
  return (
    <div className="flex">
      <div className="mr-4 mt-1">
        <div className="bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full p-1">
          <Check className="w-5 h-5 text-white" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
};

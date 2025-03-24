
import React from "react";

interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

export const StepItem = ({ number, title, description }: StepItemProps) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
        {number}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 text-sm">
        {description}
      </p>
    </div>
  );
};

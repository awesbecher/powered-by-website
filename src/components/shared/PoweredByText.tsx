
import React from "react";

interface PoweredByTextProps {
  className?: string;
}

export const PoweredByText: React.FC<PoweredByTextProps> = ({ className = "" }) => {
  return (
    <span className={`bg-white text-[#6342ff] font-bold px-4 py-1 rounded-xl ${className}`}>
      Powered_by
    </span>
  );
};

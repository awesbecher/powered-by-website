
import React from "react";

interface PoweredByTextProps {
  className?: string;
}

export const PoweredByText: React.FC<PoweredByTextProps> = ({ className = "" }) => {
  return (
    <span className={`bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md ${className}`}>
      Powered_by
    </span>
  );
};


import React from "react";
import { OptimizedImage } from "../shared/OptimizedImage";

const MercedesDealerHeader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <OptimizedImage 
        src="/lovable-uploads/924cf9f8-5676-4b70-9782-a699a7bcbd31.png"
        alt="Mercedes of Tacoma Logo"
        className="w-48 h-auto invert"  // Invert the color to white and set a reasonable width
      />
    </div>
  );
};

export default MercedesDealerHeader;

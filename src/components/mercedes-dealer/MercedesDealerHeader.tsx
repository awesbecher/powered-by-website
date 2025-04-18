
import React from "react";
import { OptimizedImage } from "../shared/OptimizedImage";

const MercedesDealerHeader = () => {
  return (
    <div className="flex justify-center items-center py-2 absolute top-4 left-0 right-0 z-10">
      <OptimizedImage 
        src="/lovable-uploads/924cf9f8-5676-4b70-9782-a699a7bcbd31.png"
        alt="Mercedes of Tacoma Logo"
        className="w-64 h-auto invert"
      />
    </div>
  );
};

export default MercedesDealerHeader;


import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LicenseHeader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="bg-white/90 rounded-lg px-6 py-3 shadow-lg max-w-[240px]">
        <AspectRatio ratio={2.5} className="w-full">
          <img 
            src="/lovable-uploads/36878018-71dd-426b-b99d-4eeffa24d71a.png"
            alt="RightBloom Logo"
            className="object-contain w-full h-full"
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default LicenseHeader;

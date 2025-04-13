
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const InsuranceHeader = () => {
  return (
    <>
      <div className="absolute inset-0 top-20 h-[500px] z-0">
        <img 
          src="/lovable-uploads/e9a419d6-efff-471a-b7fc-fc3f892e736c.png"
          alt="Insurance Coverage"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#222222] via-transparent to-[#222222]"></div>
      </div>

      <div className="flex justify-center mb-8">
        <AspectRatio ratio={3.5} className="w-64">
          <img 
            src="/lovable-uploads/71380863-25a8-4672-b241-cd4fbb01415c.png"
            alt="Planter's Insurance Logo"
            className="object-contain w-full h-full"
          />
        </AspectRatio>
      </div>
    </>
  );
};

export default InsuranceHeader;


import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const InsuranceHeader = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <AspectRatio ratio={3.5} className="w-48">
        <img 
          src="/lovable-uploads/71380863-25a8-4672-b241-cd4fbb01415c.png"
          alt="Planter's Insurance Logo"
          className="object-contain w-full h-full"
        />
      </AspectRatio>
    </div>
  );
};

export default InsuranceHeader;


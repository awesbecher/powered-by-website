
import React from "react";
import { Button } from "@/components/ui/button";

export const WebsiteHeader = () => {
  return (
    <div className="bg-white p-3 flex justify-between items-center border-b shadow-sm">
      <div className="flex items-center space-x-2">
        <a href="https://poweredby.agency/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/lovable-uploads/64bb9d7d-aaaa-4015-9a4b-839ae9f0114d.png" 
            alt="Powered By Agency" 
            className="h-10 w-auto" // Increased size from h-8 to h-10 for better visibility
          />
        </a>
      </div>
      <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-500 flex-1 mx-4 text-center">
        www.phxrealtyinc.com
      </div>
      <div className="flex items-center">
        <a 
          href="https://poweredby.agency/contact" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-white bg-[#8871e6] hover:bg-[#7860d5] px-5 py-2.5 rounded-md transition-colors shadow-md" // Enhanced button style
        >
          Book a Free Consultation
        </a>
      </div>
    </div>
  );
};

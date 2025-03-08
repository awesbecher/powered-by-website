
import React from "react";
import { Button } from "@/components/ui/button";

export const WebsiteHeader = () => {
  return (
    <div className="bg-white p-2 flex justify-between items-center border-b">
      <div className="flex items-center space-x-2">
        <a href="https://poweredby.agency/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/lovable-uploads/64bb9d7d-aaaa-4015-9a4b-839ae9f0114d.png" 
            alt="Powered By Agency" 
            className="h-8 w-auto" // Increased size from h-6 to h-8
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
          className="text-sm text-white bg-[#9b87f5] hover:bg-[#8b77e5] px-4 py-2 rounded-md font-medium transition-colors" // Increased padding and adjusted styles
        >
          Book a Free Consultation
        </a>
      </div>
    </div>
  );
};

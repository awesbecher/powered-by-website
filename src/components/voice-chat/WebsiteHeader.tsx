
import React from "react";
import { Button } from "@/components/ui/button";

export const WebsiteHeader = () => {
  return (
    <div className="bg-white p-2 flex justify-between items-center border-b">
      <div className="flex items-center space-x-2">
        <a href="https://poweredby.agency/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/lovable-uploads/65c7ad96-17cd-4bc0-8a6d-0148a49f3402.png" 
            alt="Powered By Agency" 
            className="h-6 w-auto"
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
          className="text-sm text-white bg-[#9b87f5] hover:bg-[#8b77e5] px-3 py-1.5 rounded-md font-medium transition-colors"
        >
          Book a Free Consultation
        </a>
      </div>
    </div>
  );
};

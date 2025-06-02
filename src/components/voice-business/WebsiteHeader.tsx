
import React from "react";
import { Button } from "@/components/ui/button";

export const WebsiteHeader = () => {
  return (
    <div className="bg-white p-3 flex justify-between items-center border-b shadow-sm">
      <div className="flex items-center space-x-2">
        <a href="https://poweredby.agency/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/assets/images/65c7ad96-17cd-4bc0-8a6d-0148a49f3402.png" 
            alt="Powered By Agency" 
            className="h-10 w-auto"
          />
        </a>
      </div>
      <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-500 flex-1 mx-4 text-center">
        www.businessconnections.com
      </div>
      {/* Removed the Get Started button that was here */}
    </div>
  );
};

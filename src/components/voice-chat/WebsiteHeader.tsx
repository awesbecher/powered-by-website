
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
        <Link 
          to="/contact" 
          className="text-[0.55rem] text-white bg-[#9b87f5] hover:bg-[#8b77e5] px-1.5 py-0.5 rounded"
        >
          Book a Free Consultation
        </Link>
      </div>
    </div>
  );
};

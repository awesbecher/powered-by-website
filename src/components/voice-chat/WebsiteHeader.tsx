
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const WebsiteHeader = () => {
  return (
    <div className="bg-white p-2 flex justify-between items-center border-b">
      <div className="flex space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
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

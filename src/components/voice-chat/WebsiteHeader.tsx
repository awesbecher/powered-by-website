
import React from "react";

export const WebsiteHeader = () => {
  return (
    <div className="bg-white p-3 flex justify-between items-center border-b shadow-sm">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/314cb21d-7fdb-4cdd-a44e-da8af003a7f9.png" 
          alt="Phoenix Realty Inc. Logo" 
          className="h-8 w-auto"
        />
      </div>
      <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-500 text-center">
        www.phxrealtyinc.com
      </div>
    </div>
  );
};

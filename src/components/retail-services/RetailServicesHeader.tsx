
import React from "react";

const RetailServicesHeader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div 
        className="bg-black rounded-full px-6 py-4 shadow-md flex items-center justify-center" 
        style={{ width: "280px", height: "110px" }}
      >
        <img 
          src="/assets/images/a7ad94d4-2964-4f67-bf33-ff3ad3a1ce04.png"
          alt="Flagship Barbers Logo"
          className="object-contain w-[240px] h-[100px] filter invert"
        />
      </div>
    </div>
  );
};

export default RetailServicesHeader;

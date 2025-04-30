
import React from "react";

const LicenseHeader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div 
        className="bg-white rounded-full px-6 py-4 shadow-md flex items-center justify-center" 
        style={{ width: "280px", height: "110px" }}
      >
        <img 
          src="/assets/images/36878018-71dd-426b-b99d-4eeffa24d71a.png"
          alt="RightBloom Logo"
          className="object-contain w-[240px] h-[100px]"
        />
      </div>
    </div>
  );
};

export default LicenseHeader;

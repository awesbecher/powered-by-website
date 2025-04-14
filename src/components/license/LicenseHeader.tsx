
import React from "react";

const LicenseHeader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div 
        className="bg-white rounded-full px-8 py-6 shadow-md flex items-center justify-center" 
        style={{ width: "400px", height: "160px" }}
      >
        <img 
          src="/lovable-uploads/36878018-71dd-426b-b99d-4eeffa24d71a.png"
          alt="RightBloom Logo"
          className="object-contain w-full h-full max-w-[380px] max-h-[140px]"
        />
      </div>
    </div>
  );
};

export default LicenseHeader;

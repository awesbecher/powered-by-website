
import React from "react";

const LicenseHeader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div 
        className="bg-white rounded-full px-10 py-8 shadow-md flex items-center justify-center" 
        style={{ width: "500px", height: "200px" }}
      >
        <img 
          src="/lovable-uploads/36878018-71dd-426b-b99d-4eeffa24d71a.png"
          alt="RightBloom Logo"
          className="object-contain w-full h-full max-w-[480px] max-h-[180px]"
        />
      </div>
    </div>
  );
};

export default LicenseHeader;

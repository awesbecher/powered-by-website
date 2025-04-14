
import React from "react";

const InsuranceHeader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div 
        className="bg-white rounded-full px-6 py-4 shadow-md flex items-center justify-center" 
        style={{ width: "280px", height: "110px" }}
      >
        <img 
          src="/lovable-uploads/71380863-25a8-4672-b241-cd4fbb01415c.png"
          alt="Planter's Insurance Logo"
          className="object-contain w-full h-full max-w-[270px] max-h-[100px]"
        />
      </div>
    </div>
  );
};

export default InsuranceHeader;

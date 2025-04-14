
import React from "react";

const InsuranceHeader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div 
        className="bg-white rounded-full px-10 py-8 shadow-md flex items-center justify-center" 
        style={{ width: "500px", height: "200px" }}
      >
        <img 
          src="/lovable-uploads/71380863-25a8-4672-b241-cd4fbb01415c.png"
          alt="Planter's Insurance Logo"
          className="object-contain w-full h-full max-w-[480px] max-h-[180px]"
        />
      </div>
    </div>
  );
};

export default InsuranceHeader;

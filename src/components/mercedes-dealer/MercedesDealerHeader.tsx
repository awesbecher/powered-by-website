
import React from "react";

const MercedesDealerHeader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div 
        className="bg-white rounded-full px-6 py-4 shadow-md flex items-center justify-center" 
        style={{ width: "280px", height: "110px" }}
      >
        <img 
          src="/lovable-uploads/0a2b8ea0-afdd-4814-9b46-3ebe7637b617.png"
          alt="Mercedes of Tacoma Logo"
          className="object-contain w-[240px] h-[100px]"
        />
      </div>
    </div>
  );
};

export default MercedesDealerHeader;

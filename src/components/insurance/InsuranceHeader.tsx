
import React from "react";

const InsuranceHeader = () => {
  return (
    <>
      <div className="absolute inset-0 top-20 h-[500px] z-0">
        <img 
          src="/lovable-uploads/e9a419d6-efff-471a-b7fc-fc3f892e736c.png"
          alt="Insurance Coverage"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#222222] via-transparent to-[#222222]"></div>
      </div>
    </>
  );
};

export default InsuranceHeader;

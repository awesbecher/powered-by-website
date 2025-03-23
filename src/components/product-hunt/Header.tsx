
import React from "react";
import Logo from "@/components/layout/Logo";

export const Header = () => {
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex justify-between items-center">
        <Logo />
        {/* ProductHunt button removed from here */}
      </div>
    </div>
  );
};

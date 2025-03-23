
import React from "react";
import Logo from "@/components/layout/Logo";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex space-x-6">
          {/* Desktop navigation would go here */}
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};

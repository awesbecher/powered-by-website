import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import React from "react";
import NavLink from "./NavLink";

export interface NavItem {
  name: string;
  path: string;
  isExternal?: boolean;
}

interface NavLinksProps {
  navItems: NavItem[];
}

const NavLinks = ({ navItems }: NavLinksProps) => {
  return (
    <div className="hidden md:flex items-center justify-center flex-1">
      <div className="flex items-center space-x-2">
        {/* Home Link */}
        <NavLink to="/">Home</NavLink>

        <span className="text-gray-600">|</span>

        {/* AI Agency Link */}
        <NavLink to="/ai-agency">AI Agency</NavLink>

        <span className="text-gray-600">|</span>

        {/* Other Nav Items */}
        {navItems.map((item, index) => (
          <React.Fragment key={item.name}>
            <NavLink 
              to={item.path} 
              isExternal={item.isExternal}
            >
              {item.name}
            </NavLink>
            {index < navItems.length - 1 && (
              <span className="text-gray-600">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;

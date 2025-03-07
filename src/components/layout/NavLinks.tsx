import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import React from "react";

export interface NavItem {
  name: string;
  path: string;
  isExternal?: boolean;
}

interface NavLinksProps {
  navItems: NavItem[];
}

const NavLinks = ({ navItems }: NavLinksProps) => {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center justify-center flex-1">
      <div className="flex items-center space-x-2">
        {/* Home Link */}
        <Link
          to="/"
          className={cn(
            "px-3 py-2 text-sm font-bold relative group",
            location.pathname === '/'
              ? "text-[#9b87f5]"
              : "text-gray-300 hover:text-white",
            "transition-colors duration-200"
          )}
        >
          Home
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9b87f5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
        </Link>

        <span className="text-gray-600">|</span>

        {/* AI Agency Link */}
        <Link
          to="/ai-agency"
          className={cn(
            "px-3 py-2 text-sm font-bold relative group",
            location.pathname === '/ai-agency'
              ? "text-[#9b87f5]"
              : "text-gray-300 hover:text-white",
            "transition-colors duration-200"
          )}
        >
          AI Agency
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9b87f5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
        </Link>

        <span className="text-gray-600">|</span>

        {/* Other Nav Items */}
        {navItems.map((item, index) => (
          <React.Fragment key={item.name}>
            {item.isExternal ? (
              <a
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-3 py-2 text-sm font-bold relative group",
                  "text-gray-300 hover:text-white",
                  "transition-colors duration-200"
                )}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9b87f5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  "px-3 py-2 text-sm font-bold relative group",
                  location.pathname === item.path
                    ? "text-[#9b87f5]"
                    : "text-gray-300 hover:text-white",
                  "transition-colors duration-200"
                )}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9b87f5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            )}
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

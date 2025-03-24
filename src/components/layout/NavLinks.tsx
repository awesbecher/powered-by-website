
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { NavItemWithChildren } from "./navConfig";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface NavItem {
  name: string;
  path: string;
  isExternal?: boolean;
}

interface NavLinksProps {
  navItems: NavItemWithChildren[];
}

const NavLinks = ({ navItems }: NavLinksProps) => {
  const location = useLocation();
  
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
            {item.children ? (
              <DropdownNavItem item={item} />
            ) : (
              <NavLink 
                to={item.path} 
                isExternal={item.isExternal}
              >
                {item.name}
              </NavLink>
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

const DropdownNavItem = ({ item }: { item: NavItemWithChildren }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="px-3 py-2 text-sm font-bold relative group text-gray-300 hover:text-white transition-colors duration-200 flex items-center focus:outline-none">
        {item.name}
        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9b87f5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="bg-[#222222] border border-gray-700 shadow-lg min-w-[180px] z-50">
        {item.children?.map((child) => (
          <DropdownMenuItem key={child.name} className="focus:bg-[#2f1c4a] focus:text-white hover:bg-[#2f1c4a] px-0">
            {child.isExternal ? (
              <a
                href={child.path}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white w-full block"
              >
                {child.name}
              </a>
            ) : (
              <NavLink
                to={child.path}
                isExternal={child.isExternal}
                isMobile={true}
                onClick={() => setIsOpen(false)}
              >
                {child.name}
              </NavLink>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavLinks;

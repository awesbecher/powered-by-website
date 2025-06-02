import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { NavItemWithChildren } from "./navConfig";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

export interface NavItem {
  name: string;
  path: string;
  isExternal?: boolean;
}

interface NavLinksProps {
  navItems: NavItemWithChildren[];
}

const menuItemVariants = {
  initial: { opacity: 0, x: -10 },
  enter: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: i * 0.05,
      ease: [0.21, 1.11, 0.81, 0.99]
    }
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -5,
    clipPath: "inset(0% 50% 100% 50% round 8px)",
    transition: {
      duration: 0.2,
      ease: [0.36, 0, 0.66, -0.56]
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0% round 8px)",
    transition: {
      duration: 0.3,
      ease: [0.21, 1.11, 0.81, 0.99],
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    clipPath: "inset(0% 50% 100% 50% round 8px)",
    transition: {
      duration: 0.2,
      ease: [0.36, 0, 0.66, -0.56]
    }
  }
};

const NavLinks = ({ navItems }: NavLinksProps) => {
  const location = useLocation();
  
  return (
    <motion.div 
      className="hidden md:flex items-center justify-center flex-1"
      initial="initial"
      animate="enter"
    >
      <div className="flex items-center space-x-2">
        {/* Navigation Links */}
        {navItems.map((item, index) => (
          <React.Fragment key={item.name}>
            <motion.div 
              variants={menuItemVariants} 
              custom={index}
              whileHover="hover"
            >
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
            </motion.div>
            {index < navItems.length - 1 && (
              <motion.span 
                variants={menuItemVariants} 
                custom={index + 1}
                className="text-gray-600"
              >
                |
              </motion.span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

const DropdownNavItem = ({ item }: { item: NavItemWithChildren }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleItemClick = (path: string, isExternal: boolean = false) => {
    if (isExternal) {
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      window.scrollTo(0, 0);
      navigate(path);
    }
    setIsOpen(false);
  };
  
  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Direct link to item path */}
      <button
        onClick={() => handleItemClick(item.path)}
        className="px-3 py-2 text-sm font-bold relative group text-gray-300 hover:text-white transition-colors duration-200"
      >
        {item.name}
      </button>
      
      {/* Dropdown trigger button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className="text-gray-300 hover:text-white focus:outline-none"
      >
        <ChevronDown 
          className="ml-1 h-4 w-4 transition-transform duration-200" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      
      {/* Dropdown content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 top-full mt-2 w-48 rounded-md shadow-lg bg-[#222222] border border-gray-700 z-50"
          >
            <div className="py-1">
              {item.children?.map((child, index) => (
                <motion.button
                  key={child.name}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800"
                  onClick={() => handleItemClick(child.path, child.isExternal)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  variants={menuItemVariants}
                  custom={index}
                >
                  {child.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavLinks;

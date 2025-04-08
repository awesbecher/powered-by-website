
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from "lucide-react";

interface NavDropdownItem {
  label: string;
  path: string;
  isExternal?: boolean;
}

interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
  path?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ 
  label, 
  items, 
  path = "#", 
  isOpen, 
  setIsOpen 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link 
        to={path}
        className="px-3 py-2 text-sm font-bold text-gray-300 hover:text-white transition-colors duration-200"
        onClick={path === "#" ? handleClick : undefined}
      >
        {label}
      </Link>
      <button
        onClick={handleClick}
        className="text-gray-300 hover:text-white focus:outline-none"
      >
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`absolute left-0 mt-14 w-48 rounded-md shadow-lg bg-[#222222] border border-gray-700 transition-all duration-200 z-50 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="py-1">
          {items.map((item, index) => (
            item.isExternal ? (
              <a 
                key={index}
                href={item.path} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link 
                key={index}
                to={item.path}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;

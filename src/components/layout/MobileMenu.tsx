import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NavItemWithChildren } from './navConfig';
import { NavbarCta } from '@/components/navigation/NavbarCta';
import { getCalApi } from "@calcom/embed-react";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItem[];
}

interface NavLinkProps {
  item: NavItem;
  closeMenu: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, closeMenu }) => {
  const handleClick = () => {
    closeMenu();
  };

  if (item.isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block px-4 py-2 text-gray-300 hover:text-white"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={item.href}
      onClick={handleClick}
      className="block px-4 py-2 text-gray-300 hover:text-white"
    >
      {item.label}
    </Link>
  );
};

interface MobileMenuProps {
  navItems: NavItemWithChildren[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMenu();
    const cal = (window as any).Cal;
    if (cal) {
      cal("showModal", { calLink: "team-powered-by-dfbtbb/get-started-today" });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-gray-300 hover:text-white"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-[#222222] border-b border-gray-800/50"
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item, index) => (
                <NavLink 
                  key={index} 
                  item={{
                    label: item.name,
                    href: item.path,
                    isExternal: item.isExternal
                  }} 
                  closeMenu={closeMenu} 
                />
              ))}
              <div className="pt-2 pb-4">
                <NavbarCta 
                  onClick={handleCtaClick}
                  className="w-full justify-center"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NavItemWithChildren } from './navConfig';

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
        className="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
        onClick={handleClick}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={item.href}
      className="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
      onClick={handleClick}
    >
      {item.label}
    </Link>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
  navItems: NavItemWithChildren[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, closeMenu, navItems }) => {
  const menuItems = [
    { label: 'AI Agency', href: '/ai-agency' },
    ...navItems.map(item => ({
      label: item.name,
      href: item.path,
      isExternal: item.isExternal,
      children: item.children?.map(child => ({
        label: child.name,
        href: child.path,
        isExternal: child.isExternal
      }))
    }))
  ];

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold text-white">Menu</span>
        <button onClick={closeMenu} className="p-2 text-gray-50 hover:text-white">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            closeMenu={closeMenu}
          >
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;

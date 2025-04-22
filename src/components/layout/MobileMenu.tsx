import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface NavLinkProps {
  href: string;
  isExternal?: boolean;
  isMobile: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, isExternal, isMobile, onClick, children }) => {
  const handleClick = () => {
    if (isMobile) {
      onClick();
    }
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, closeMenu }) => {
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Demos', href: '/demo' },
    { label: 'Contact', href: '/contact' },
    { label: 'AI Agency', href: '/ai-agency' },
    { label: 'Agent Marketplace', href: '/agent-marketplace' },
    { label: 'Careers', href: '/careers' },
    { label: 'News', href: '/news' },
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
            href={item.href}
            isExternal={item.isExternal}
            isMobile={true}
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;

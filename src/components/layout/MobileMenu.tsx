import React, { useState, useRef, useEffect } from "react";
import { NavLinkProps } from "./NavLinks";
import { NavLink } from "./NavLink";
import { ConsultButton } from "./ConsultButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  navItems: NavLinkProps[];
  showConsultButton: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, showConsultButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useOnClickOutside(menuRef, closeMenu);

  // Disable scrolling when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden relative">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none transition-transform transform hover:scale-110"
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-0 right-0 mt-12 w-screen min-h-screen bg-[#222222]/95 backdrop-blur-lg rounded-md shadow-xl z-50 overflow-y-auto"
        >
          <div className="container mx-auto p-4 flex flex-col gap-4">
            {/* Navigation Links */}
            {navItems.map((item) => (
              <NavLink
                key={item.title}  // Move key out of the props
                to={item.href}
                isExternal={item.external || false}
                isMobile={true}
                onClick={closeMenu}
              >
                {item.title}
              </NavLink>
            ))}

            {/* Consult Button */}
            {showConsultButton && (
              <div className="mt-4">
                <ConsultButton show={true} isMobile={true} onClick={closeMenu} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;

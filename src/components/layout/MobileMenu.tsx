import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavLink from "./NavLink";
import { NavItem } from "./NavLinks";

interface MobileMenuProps {
  navItems: NavItem[];
  showConsultButton: boolean;
}

const MobileMenu = ({ navItems, showConsultButton }: MobileMenuProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button 
        className="text-gray-300 hover:text-white p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu Dropdown with Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden py-4 bg-[#222222] border-t border-gray-700 absolute top-20 left-0 right-0 z-50"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col space-y-2">
              <NavLink 
                to="/"
                isMobile
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/ai-agency"
                isMobile
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Agency
              </NavLink>
              
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  isExternal={item.isExternal}
                  isMobile
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              
              {showConsultButton && (
                <Link
                  to="/contact"
                  className="mx-4 mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#9b87f5]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book a Free Consultation
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;

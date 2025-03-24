
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavLink from "./NavLink";
import { NavItemWithChildren } from "./navConfig";
import { ChevronDown, ChevronRight, Headset } from "lucide-react";

interface MobileMenuProps {
  navItems: NavItemWithChildren[];
  showConsultButton: boolean;
}

const MobileMenu = ({ navItems, showConsultButton }: MobileMenuProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleTalkToAgent = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
    setIsMobileMenuOpen(false);
  };

  const toggleExpandItem = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

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
                <div key={item.name} className="flex flex-col">
                  {item.children ? (
                    <>
                      <div 
                        className="mx-4 py-2 flex items-center justify-between text-sm cursor-pointer"
                        onClick={() => toggleExpandItem(item.name)}
                      >
                        <span className="text-gray-300 font-medium">{item.name}</span>
                        <ChevronDown 
                          className="h-4 w-4 text-gray-500 transition-transform duration-200"
                          style={{ transform: expandedItem === item.name ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </div>
                      
                      {expandedItem === item.name && (
                        <div className="ml-8 flex flex-col space-y-2 mt-2 mb-2">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.name}
                              to={child.path}
                              isExternal={child.isExternal}
                              isMobile
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <ChevronRight className="h-3 w-3 mr-1 inline" />
                              {child.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      isExternal={item.isExternal}
                      isMobile
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
              
              {showConsultButton && (
                <>
                  <button
                    className="mx-4 mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#6342ff]"
                    onClick={handleTalkToAgent}
                  >
                    <Headset className="w-4 h-4 mr-1.5" />
                    Talk to an AI Agent
                  </button>
                  <Link
                    to="/contact"
                    className="mx-4 mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#9b87f5]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;

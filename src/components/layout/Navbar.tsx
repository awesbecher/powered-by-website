
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import React from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Solutions", path: "/products" },
    { name: "Demos", path: "/demo" },
    // Updated with the correct Ghost URL
    { name: "Resources", path: "https://poweredbyagency.ghost.io", isExternal: true }
  ];

  // Check if we should show the consultation button on current page
  const showConsultButton = ['/', '/ai-agency', '/products', '/demo', '/blog', '/voice-chat', '/ai-assistant'].includes(location.pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#222222]/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src="/lovable-uploads/21341be9-b85c-4ea3-b346-3c45080b3810.png" 
                alt="Powered By Agency" 
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Items */}
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

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Consultation Button */}
            {showConsultButton && (
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#9b87f5] hover:bg-[#8b77e5] transition-colors duration-200"
              >
                Book a Free Consultation
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-300 hover:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-[#222222] border-t border-gray-700">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  location.pathname === '/'
                    ? "text-[#9b87f5]"
                    : "text-gray-300"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/ai-agency"
                className={cn(
                  "px-4 py-2 text-sm font-medium",
                  location.pathname === '/ai-agency'
                    ? "text-[#9b87f5]"
                    : "text-gray-300"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Agency
              </Link>
              {navItems.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium text-gray-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "px-4 py-2 text-sm font-medium",
                      location.pathname === item.path
                        ? "text-[#9b87f5]"
                        : "text-gray-300"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

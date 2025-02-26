import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Solutions", path: "/products" },
    { name: "Demos", path: "/demo" },
    { name: "Blog", path: "/blog" }
  ];

  // Check if we should show the consultation button on current page
  const showConsultButton = ['/', '/ai-agency', '/products', '/demo', '/blog'].includes(location.pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#222222]/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Navigation Items */}
          <div className="flex items-center justify-center flex-1">
            <div className="flex space-x-2">
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

              {/* Other Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
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
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            {/* Consultation Button */}
            {showConsultButton && (
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#9b87f5] hover:bg-[#8b77e5] transition-colors duration-200"
              >
                Book a Free Consultation
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

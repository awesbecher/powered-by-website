import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ChevronDown } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [showAIAgencySubmenu, setShowAIAgencySubmenu] = useState(false);

  const navItems = [
    { name: "Solutions", path: "/products" },
    { name: "Demos", path: "/demo" },
    { name: "Blog", path: "/blog" }
  ];

  // Check if we should show the consultation button on current page
  const showConsultButton = ['/', '/ai-agency', '/products', '/demo', '/blog', '/whats-an-ai-agent'].includes(location.pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#222222]/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
                alt="Parlar Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {/* AI Agency Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowAIAgencySubmenu(true)}
                onMouseLeave={() => setShowAIAgencySubmenu(false)}
              >
                <Link
                  to="/ai-agency"
                  className={cn(
                    "px-3 py-2 text-sm font-medium flex items-center gap-1 relative group",
                    location.pathname === '/ai-agency' || location.pathname === '/whats-an-ai-agent'
                      ? "text-[#9b87f5]"
                      : "text-gray-300 hover:text-white",
                    "transition-colors duration-200"
                  )}
                >
                  AI Agency
                  <ChevronDown className="h-4 w-4" />
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9b87f5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>

                {/* Dropdown Menu */}
                <div 
                  className={cn(
                    "absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-[#222222]/95 ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top",
                    showAIAgencySubmenu ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                  )}
                >
                  <Link
                    to="/whats-an-ai-agent"
                    className={cn(
                      "block px-4 py-2 text-sm",
                      location.pathname === '/whats-an-ai-agent'
                        ? "text-[#9b87f5]"
                        : "text-gray-300 hover:text-white hover:bg-[#333333]",
                      "transition-colors duration-200"
                    )}
                  >
                    What's an AI Agent?
                  </Link>
                </div>
              </div>

              {/* Other Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 text-sm font-medium relative group",
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
            {/* AI Agent Button - Only show on Contact page */}
            {location.pathname === '/contact' && (
              <Button className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white">
                <MessageSquare className="mr-2 h-4 w-4" />
                Talk to an AI Agent Now
              </Button>
            )}

            {/* Consultation Button */}
            {showConsultButton && (
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#9b87f5] hover:bg-[#8b77e5] transition-colors duration-200"
              >
                Book a Consultation
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

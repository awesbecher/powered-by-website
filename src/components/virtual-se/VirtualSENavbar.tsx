
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";
import VirtualSEMobileMenu from './VirtualSEMobileMenu';
import { ChevronDown } from "lucide-react";

const VirtualSENavbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    // If we're already on the virtual SE page, just scroll to top
    if (location.pathname === "/getvirtual-se") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="bg-[#222222]/80 backdrop-blur-lg border-b border-gray-800/50 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Custom Logo that links to /getvirtual-se */}
          <div className="flex-shrink-0">
            <Link to="/getvirtual-se" onClick={handleClick}>
              <img 
                src="/lovable-uploads/29391c50-2dfd-4879-9bd5-70914db50c97.png" 
                alt="Virtual SE Logo" 
                className="h-16 w-auto object-contain" 
              />
            </Link>
          </div>

          {/* Navigation Items - Custom for Virtual SE */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-2">
              {/* Home Link */}
              <Link 
                to="/"
                className="px-3 py-2 text-sm font-bold relative group text-gray-300 hover:text-white transition-colors duration-200"
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ea384c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>

              <span className="text-gray-600">|</span>

              {/* Solution Link with dropdown - update to allow direct click */}
              <div className="relative group"
                   onMouseEnter={() => setSolutionsDropdownOpen(true)}
                   onMouseLeave={() => setSolutionsDropdownOpen(false)}>
                {/* Direct link for when clicking on "Solution" */}
                <Link 
                  to="/products"
                  className="px-3 py-2 text-sm font-bold relative group text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                >
                  Solution
                  <ChevronDown 
                    className="ml-1 h-4 w-4 transition-transform duration-200"
                    style={{ transform: solutionsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ea384c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
                <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#222222] border border-gray-700 transition-all duration-200 z-50 ${solutionsDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  <div className="py-1">
                    <Link 
                      to="/voice-chat"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    >
                      AI Voice Chat
                    </Link>
                    <Link 
                      to="/ai-receptionist"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    >
                      AI Receptionist
                    </Link>
                    <Link 
                      to="/email-agent"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    >
                      Email Agent
                    </Link>
                    <Link 
                      to="/text-agent"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    >
                      Text Agent
                    </Link>
                    <Link 
                      to="/virtual-se"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    >
                      Virtual SE
                    </Link>
                    <Link 
                      to="/outbound-ai"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    >
                      OutboundAI
                    </Link>
                  </div>
                </div>
              </div>

              <span className="text-gray-600">|</span>

              {/* Resources Link with dropdown */}
              <div className="relative group"
                   onMouseEnter={() => setResourcesDropdownOpen(true)}
                   onMouseLeave={() => setResourcesDropdownOpen(false)}>
                <Link 
                  to="#"
                  className="px-3 py-2 text-sm font-bold relative group text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                >
                  Resources
                  <ChevronDown 
                    className="ml-1 h-4 w-4 transition-transform duration-200"
                    style={{ transform: resourcesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ea384c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
                <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#222222] border border-gray-700 transition-all duration-200 z-50 ${resourcesDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  <div className="py-1">
                    <a 
                      href="https://poweredbyagency.ghost.io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    >
                      AI Research
                    </a>
                    <Link 
                      to="/news"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    >
                      News
                    </Link>
                    <Link 
                      to="/careers"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    >
                      Careers
                    </Link>
                    <a 
                      href="https://www.youtube.com/@Powered_byAgency" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    >
                      Videos
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side buttons - only showing Get Started button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ea384c] hover:bg-[#d42e40] transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button and Dropdown - Customized for Virtual SE */}
          <VirtualSEMobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default VirtualSENavbar;

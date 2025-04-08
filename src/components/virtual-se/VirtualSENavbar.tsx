
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
          <div className="hidden md:flex items-center space-x-2">
            {/* Home Link */}
            <Link 
              to="/"
              className="px-3 py-2 text-sm font-bold relative group text-gray-300 hover:text-white transition-colors duration-200"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ea384c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </Link>

            <span className="text-gray-600">|</span>

            {/* Solution Link with dropdown - both text and chevron can trigger the dropdown */}
            <div 
              className="relative flex items-center"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <Link 
                to="/products"
                className="px-3 py-2 text-sm font-bold text-gray-300 hover:text-white transition-colors duration-200"
              >
                Solution
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSolutionsDropdownOpen(!solutionsDropdownOpen);
                }}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </button>
              
              <div className={`absolute left-0 mt-14 w-48 rounded-md shadow-lg bg-[#222222] border border-gray-700 transition-all duration-200 z-50 ${solutionsDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="py-1">
                  <Link 
                    to="/voice-chat"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    onClick={() => setSolutionsDropdownOpen(false)}
                  >
                    AI Voice Chat
                  </Link>
                  <Link 
                    to="/ai-receptionist"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    onClick={() => setSolutionsDropdownOpen(false)}
                  >
                    AI Receptionist
                  </Link>
                  <Link 
                    to="/email-agent"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    onClick={() => setSolutionsDropdownOpen(false)}
                  >
                    Email Agent
                  </Link>
                  <Link 
                    to="/text-agent"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    onClick={() => setSolutionsDropdownOpen(false)}
                  >
                    Text Agent
                  </Link>
                  <Link 
                    to="/virtual-se"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    onClick={() => setSolutionsDropdownOpen(false)}
                  >
                    Virtual SE
                  </Link>
                  <Link 
                    to="/outbound-ai"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    onClick={() => setSolutionsDropdownOpen(false)}
                  >
                    OutboundAI
                  </Link>
                </div>
              </div>
            </div>

            <span className="text-gray-600">|</span>

            {/* Resources Link with dropdown - both text and chevron can trigger the dropdown */}
            <div 
              className="relative flex items-center"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <Link 
                to="#"
                className="px-3 py-2 text-sm font-bold text-gray-300 hover:text-white transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  setResourcesDropdownOpen(!resourcesDropdownOpen);
                }}
              >
                Resources
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setResourcesDropdownOpen(!resourcesDropdownOpen);
                }}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </button>
              
              <div className={`absolute left-0 mt-14 w-48 rounded-md shadow-lg bg-[#222222] border border-gray-700 transition-all duration-200 z-50 ${resourcesDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="py-1">
                  <a 
                    href="https://poweredbyagency.ghost.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    onClick={() => setResourcesDropdownOpen(false)}
                  >
                    AI Research
                  </a>
                  <Link 
                    to="/news"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    onClick={() => setResourcesDropdownOpen(false)}
                  >
                    News
                  </Link>
                  <Link 
                    to="/careers"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    onClick={() => setResourcesDropdownOpen(false)}
                  >
                    Careers
                  </Link>
                  <a 
                    href="https://www.youtube.com/@Powered_byAgency" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2f1c4a] hover:text-white"
                    onClick={() => setResourcesDropdownOpen(false)}
                  >
                    Videos
                  </a>
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


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";
import VirtualSEMobileMenu from './VirtualSEMobileMenu';
import NavbarLogo from './navbar/NavbarLogo';
import NavDropdown from './navbar/NavDropdown';

const VirtualSENavbar = () => {
  const isMobile = useIsMobile();
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  
  // Define solutions dropdown items
  const solutionItems = [
    { label: "AI Voice Chat", path: "/voice-chat" },
    { label: "AI Receptionist", path: "/ai-receptionist" },
    { label: "Email Agent", path: "/email-agent" },
    { label: "Text Agent", path: "/text-agent" },
    { label: "Virtual SE", path: "https://www.getvirtual.se", isExternal: true },
    { label: "OutboundAI", path: "/outbound-ai" }
  ];

  // Define resources dropdown items
  const resourceItems = [
    { label: "AI Research", path: "https://poweredbyagency.ghost.io", isExternal: true },
    { label: "News", path: "/news" },
    { label: "Careers", path: "/careers" },
    { label: "Videos", path: "https://www.youtube.com/@Powered_byAgency", isExternal: true },
    { label: "Podcast", path: "/agent-podcast" }
  ];

  return (
    <nav className="bg-[#222222]/80 backdrop-blur-lg border-b border-gray-800/50 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Custom Logo */}
          <NavbarLogo
            logoSrc="/lovable-uploads/29391c50-2dfd-4879-9bd5-70914db50c97.png"
            altText="Virtual SE Logo"
            linkPath="/getvirtual-se"
          />

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

            {/* Solutions Dropdown */}
            <NavDropdown
              label="Solution"
              path="/products"
              items={solutionItems}
              isOpen={solutionsDropdownOpen}
              setIsOpen={setSolutionsDropdownOpen}
            />

            <span className="text-gray-600">|</span>

            {/* Resources Dropdown */}
            <NavDropdown
              label="Resources"
              items={resourceItems}
              isOpen={resourcesDropdownOpen}
              setIsOpen={setResourcesDropdownOpen}
            />
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


import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ConsultButton from "./ConsultButton";
import MobileMenu from "./MobileMenu";
import { navItems } from "./navConfig";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Always show consultation button on all pages
  const showConsultButton = true;
  
  // Determine if we're on a builder page
  const isBuilderPath = location.pathname === "/agent-gpt" || 
                       location.pathname === "/agent-marketplace" || 
                       location.pathname === "/agent-gpt-builder";
  
  console.log("Current path:", location.pathname);
  console.log("Show consult button:", showConsultButton);
  console.log("Is mobile:", isMobile);

  return (
    <nav className={`bg-[#222222]/80 backdrop-blur-lg border-b border-gray-800/50 relative z-50 ${
      isMobile ? 'sticky top-0' : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Navigation Items */}
          <NavLinks navItems={navItems} />

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ConsultButton show={showConsultButton} />
          </div>

          {/* Mobile Menu Button and Dropdown */}
          <MobileMenu 
            navItems={navItems} 
            showConsultButton={showConsultButton} 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

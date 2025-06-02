import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { navItems } from "./navConfig";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavbarCta } from "@/components/navigation/NavbarCta";
import { useEffect } from "react";
import { initializeCalendar, openCalendarModal } from "@/utils/calendarUtils";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    (async function () {
      try {
        await initializeCalendar();
      } catch (error) {
        console.error("Error initializing Cal.com embed:", error);
      }
    })();
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openCalendarModal();
  };

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
          <div className="hidden md:flex items-center">
            <NavbarCta />
          </div>

          {/* Mobile Menu Button and Dropdown */}
          <MobileMenu 
            navItems={navItems}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

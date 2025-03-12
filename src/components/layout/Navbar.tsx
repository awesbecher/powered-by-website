
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ConsultButton from "./ConsultButton";
import MobileMenu from "./MobileMenu";
import { navItems, consultationPaths } from "./navConfig";

const Navbar = () => {
  const location = useLocation();

  // Check if we should show the consultation button on current page
  const showConsultButton = consultationPaths.includes(location.pathname);
  
  console.log("Current path:", location.pathname);
  console.log("Show consult button:", showConsultButton);
  console.log("Consultation paths:", consultationPaths);

  return (
    <nav className="bg-[#222222]/80 backdrop-blur-lg border-b border-gray-800/50">
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

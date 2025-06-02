
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarLogoProps {
  logoSrc: string;
  altText: string;
  linkPath: string;
}

const NavbarLogo: React.FC<NavbarLogoProps> = ({ logoSrc, altText, linkPath }) => {
  const location = useLocation();
  
  const handleClick = (e: React.MouseEvent) => {
    // If we're already on the target page, just scroll to top
    if (location.pathname === linkPath) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex-shrink-0">
      <Link to={linkPath} onClick={handleClick}>
        <img 
          src={logoSrc} 
          alt={altText} 
          className="h-16 w-auto object-contain" 
        />
      </Link>
    </div>
  );
};

export default NavbarLogo;

import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Logo = () => {
  const location = useLocation();
  
  const handleClick = (e: React.MouseEvent) => {
    // If we're already on the home page, just scroll to top
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex-shrink-0">
      <Link to="/" onClick={handleClick}>
        <img 
          src="/assets/images/21341be9-b85c-4ea3-b346-3c45080b3810.png" 
          alt="Powered By Agency" 
          className="h-8 w-auto object-contain"
        />
      </Link>
    </div>
  );
};

export default Logo;

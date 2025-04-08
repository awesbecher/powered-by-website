
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isExternal?: boolean;
  isMobile?: boolean;
  isActive?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const NavLink = ({ 
  to, 
  children, 
  isExternal = false, 
  isMobile = false,
  isActive,
  className,
  onClick 
}: NavLinkProps) => {
  const location = useLocation();
  const active = isActive !== undefined ? isActive : location.pathname === to;
  
  // Mobile styles are simpler
  const mobileClasses = cn(
    "px-4 py-2 text-sm font-medium",
    active ? "text-[#9b87f5]" : "text-gray-300",
    className
  );
  
  // Desktop styles include hover effects
  const desktopClasses = cn(
    "px-3 py-2 text-sm font-bold relative group",
    active ? "text-[#9b87f5]" : "text-gray-300 hover:text-white",
    "transition-colors duration-200",
    className
  );
  
  const classes = isMobile ? mobileClasses : desktopClasses;
  
  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
        {!isMobile && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9b87f5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
        )}
      </a>
    );
  }
  
  return (
    <Link
      to={to}
      className={classes}
      onClick={onClick}
    >
      {children}
      {!isMobile && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9b87f5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
      )}
    </Link>
  );
};

export default NavLink;

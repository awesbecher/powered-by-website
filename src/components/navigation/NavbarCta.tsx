import React from 'react';

interface NavbarCtaProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

export const NavbarCta: React.FC<NavbarCtaProps> = ({
  href = '#',
  onClick,
  className = '',
  children = 'Get Started'
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        ml-auto 
        px-4 py-2 
        md:px-5 md:py-2.5 
        text-sm font-medium 
        leading-5
        text-[#8B5CF6] 
        border-2 
        border-[#8B5CF6] 
        rounded-full 
        hover:bg-[#8B5CF6] 
        hover:text-white 
        transition-colors 
        duration-200 
        ease-in-out
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </a>
  );
};

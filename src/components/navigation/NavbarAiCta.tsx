import React, { useState } from 'react';
import { VapiCallDialog } from "@/components/shared/VapiCallDialog";

interface NavbarAiCtaProps {
  className?: string;
  children?: React.ReactNode;
}

export const NavbarAiCta: React.FC<NavbarAiCtaProps> = ({
  className = '',
  children = 'Talk to AI Agent Now'
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          px-4 py-2 
          md:px-5 md:py-2.5 
          text-sm font-medium 
          leading-5
          text-[#10B981] 
          border-2 
          border-[#10B981] 
          rounded-full 
          hover:bg-[#10B981] 
          hover:text-white 
          transition-colors 
          duration-200 
          ease-in-out
          ${className}
        `.replace(/\s+/g, ' ').trim()}
      >
        {children}
      </button>
      <VapiCallDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

import React, { useState } from 'react';
import CalendarButton from '@/components/shared/CalendarButton';
import { VapiCallDialog } from '@/components/shared/VapiCallDialog';
import { HeadsetIcon } from 'lucide-react';

interface NavbarCtaProps {
  className?: string;
  children?: React.ReactNode;
}

export const NavbarCta: React.FC<NavbarCtaProps> = ({
  className = '',
  children = 'Get Started'
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleAIAgentClick = () => {
    console.log("Talk to AI Agent button clicked from navbar, opening Vapi call dialog");
    setDialogOpen(true);
  };
  
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleAIAgentClick}
        className="
          px-4 py-2 
          md:px-5 md:py-2.5 
          text-sm font-medium 
          leading-5
          text-[#6342ff] 
          border-2 
          border-[#6342ff] 
          rounded-full 
          hover:bg-[#6342ff] 
          hover:text-white 
          transition-colors 
          duration-200 
          ease-in-out
          flex items-center
        "
      >
        <HeadsetIcon className="w-4 h-4 mr-1.5" />
        Talk to an AI Agent
      </button>
      
      <CalendarButton
        calLink="team-powered-by-dfbtbb/get-started-today"
        className={`
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
      </CalendarButton>
      
      {dialogOpen && <VapiCallDialog open={dialogOpen} onOpenChange={setDialogOpen} />}
    </div>
  );
};


import React, { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  gradientFrom?: string;
  gradientTo?: string;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  gradientFrom = "purple-400",
  gradientTo = "[#9b87f5]",
  children 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check localStorage on mount
  useEffect(() => {
    const expanded = localStorage.getItem(`infoCard-${title}`);
    if (expanded === 'true') {
      setIsExpanded(true);
    }
  }, [title]);

  const handleMouseEnter = () => {
    setIsExpanded(true);
    localStorage.setItem(`infoCard-${title}`, 'true');
  };

  return (
    <div className="relative group" onMouseEnter={handleMouseEnter}>
      <div className={`absolute -inset-1 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`} />
      <div className="relative p-6 bg-[#1e1e2e] ring-1 ring-gray-900/5 rounded-lg leading-none">
        <div className="flex items-top justify-start space-x-6">
          <div className="flex-shrink-0">
            <Icon className="w-8 h-8 text-transparent bg-gradient-to-r from-purple-400 to-[#9b87f5] bg-clip-text stroke-[#9b87f5]" strokeWidth={2} />
          </div>
          <div className="space-y-4 w-full">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-[#9b87f5] bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
              {title}
            </h3>
            <div className={`text-gray-300 text-left transition-all duration-300 overflow-hidden leading-relaxed
              ${isExpanded ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
              {children || description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

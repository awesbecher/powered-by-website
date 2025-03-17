
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureIconProps {
  icon: LucideIcon;
  customIcon?: React.ReactNode;
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({ icon: Icon, customIcon }) => {
  if (customIcon) {
    return (
      <div className="text-[#9b87f5] mt-1">
        {customIcon}
      </div>
    );
  }
  
  return (
    <div className="text-[#9b87f5] mt-1">
      <Icon size={40} />
    </div>
  );
};

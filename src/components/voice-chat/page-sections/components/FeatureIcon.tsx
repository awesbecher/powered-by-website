
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureIconProps {
  icon: LucideIcon;
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({ icon: Icon }) => {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#9b87f5]/10 border border-[#9b87f5]/20">
      <Icon className="w-6 h-6 text-[#9b87f5]" />
    </div>
  );
};

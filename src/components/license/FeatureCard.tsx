
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, iconColor }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
      <Icon className={`w-8 h-8 ${iconColor} mb-4`} />
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;

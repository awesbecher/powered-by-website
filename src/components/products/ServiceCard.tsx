import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: React.ReactNode;
  icon: LucideIcon;
  description: string;
  features: string[];
  imageSrc?: string; // Keep the prop for backward compatibility
}

export const ServiceCard = ({ 
  title, 
  icon: Icon, 
  description, 
  features
}: ServiceCardProps) => {
  const IconComponent = <Icon className="w-10 h-10 text-white" />;

  return (
    <div className="bg-[#1a0b2e]/40 rounded-2xl p-6 space-y-4 border border-white/10">
      <div className="flex items-center space-x-4 mb-4">
        {IconComponent}
        <div>
          {title}
        </div>
      </div>
      
      <p className="text-white/80 mb-4">{description}</p>
      
      <ul className="space-y-2 text-white/70">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#9b87f5] rounded-full"></span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

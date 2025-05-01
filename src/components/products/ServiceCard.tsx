import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: {
    main: string;
    sub: string;
  };
  icon: LucideIcon;
  description: string;
  features: string[];
  imageSrc?: string;
}

export const ServiceCard = ({ 
  title, 
  icon: Icon, 
  description, 
  features
}: ServiceCardProps) => {
  return (
    <div className="bg-[#1a0b2e]/40 rounded-2xl p-6 space-y-4 border border-white/10">
      <div className="flex items-start justify-between">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-10 h-10 text-white" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold">
        <span className="text-white">{title.main}</span>{' '}
        <span className="text-[#9b87f5]">{title.sub}</span>
      </h3>
      
      <p className="text-gray-300">{description}</p>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;


import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

export const ServiceCard = ({ title, description, features, icon: Icon }: ServiceCardProps) => {
  return (
    <div className="group border-t border-white/10 py-12 transition-all hover:bg-white/5">
      <div className="grid gap-4 md:grid-cols-[1fr,2fr,1fr] items-start">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
          <Icon className="w-8 h-8 text-[#9b87f5] mt-4" />
        </div>
        
        <p className="text-lg text-gray-400 leading-relaxed">
          {description}
        </p>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className="text-gray-400 hover:text-[#9b87f5] transition-colors"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

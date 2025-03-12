
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: ReactNode;
  icon: LucideIcon;
  description: string;
  features: string[];
  onContactClick?: () => void;
}

export const ServiceCard = ({ title, icon, description, features }: ServiceCardProps) => {
  const Icon = icon;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col gap-6 items-start">
        <div className="w-full space-y-4">
          <div className="flex items-center gap-3">
            <Icon className="h-10 w-10 text-accent" />
            <h2 className="text-2xl sm:text-3xl">{title}</h2>
          </div>
          <p className="text-gray-300 text-lg">{description}</p>
          {/* Updated grid with reduced horizontal spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start pl-0">
                <span className="text-accent mr-1 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


import { LucideIcon } from "lucide-react";

interface LicenseProductCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: LucideIcon;
}

export const LicenseProductCard = ({
  title,
  description,
  price,
  features,
  icon: Icon,
}: LicenseProductCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 flex flex-col h-full hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-4 mb-4">
        <Icon className="h-8 w-8 text-accent" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="text-2xl font-bold text-accent mb-4">{price}</div>
      <ul className="space-y-2 text-gray-300 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

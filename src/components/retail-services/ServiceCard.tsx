
import { Clock } from "lucide-react";

interface ServiceCardProps {
  name: string;
  description: string;
  price: string;
  duration: string;
}

const ServiceCard = ({ name, description, price, duration }: ServiceCardProps) => {
  return (
    <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <span className="text-accent font-bold">{price}</span>
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex items-center text-gray-500 text-sm">
        <Clock className="w-4 h-4 mr-1" />
        <span>{duration}</span>
      </div>
    </div>
  );
};

export default ServiceCard;

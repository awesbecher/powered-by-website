
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10">
      <Icon className="w-8 h-8 mb-4 text-[#9b87f5]" />
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-white">{description}</p>
    </div>
  );
};


import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: ReactNode;
  icon: LucideIcon;
  description: string;
  features: string[];
  onContactClick?: () => void;
}

export const ServiceCard = ({ title, icon, description, features, onContactClick }: ServiceCardProps) => {
  const Icon = icon;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="lg:w-2/3 space-y-6">
          <div className="flex items-center gap-3">
            <Icon className="h-10 w-10 text-accent" />
            <h2 className="text-2xl sm:text-3xl">{title}</h2>
          </div>
          <p className="text-gray-300 text-lg">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3 bg-white/5 p-6 rounded-xl border border-white/10 space-y-5">
          <h3 className="text-xl font-semibold text-white">Ready to learn more?</h3>
          <p className="text-gray-300">
            Book a free consultation with our solutions team to explore how this AI agent solution could work for your business.
          </p>
          <Button 
            className="w-full bg-accent hover:bg-accent/90"
            onClick={onContactClick}
          >
            Book a Free Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

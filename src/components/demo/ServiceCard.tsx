
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
      <CardContent className="p-6">
        <div className="mb-4 text-[#9b87f5]">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;

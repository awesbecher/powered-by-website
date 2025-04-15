
import React from 'react';
import { ServiceCard } from "@/components/home/ServiceCard";
import { Service } from "@/data/services";

// Define the props expected by ServiceCard
interface ServiceProps {
  key: string;
  title: string;
  description: string;
  iconPath?: string;
  link?: string;
  buttonText?: string;
  isNew?: boolean;
  isEnterprise?: boolean;
}

export const DemosList = () => {
  // Import services directly in the component to avoid circular dependencies
  const { services } = require("@/data/services");
  
  return (
    <div className="relative px-4 py-8 lg:px-6 space-y-8 animate-fadeIn">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service: Service) => (
            <ServiceCard 
              key={service.title}
              title={service.title}
              description={service.description}
              iconPath={service.iconPath}
              link={service.link}
              buttonText={service.buttonText}
              isNew={service.isNew}
              isEnterprise={service.isEnterprise}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

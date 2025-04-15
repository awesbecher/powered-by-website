
import React from 'react';
import { ServiceCard } from "@/components/home/ServiceCard";
import { Service, services } from "@/data/services";

export const DemosList = () => {
  return (
    <div className="relative px-4 py-8 lg:px-6 space-y-8 animate-fadeIn">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service: Service) => (
            <ServiceCard 
              key={service.title}
              title={service.title}
              description={service.description}
              logo={service.iconPath}
              category={service.category || "AI Agent Demo"}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

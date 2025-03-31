
import { ServiceCard } from "@/components/home/ServiceCard";
import { services, additionalServices } from "@/data/services";

export const DemosList = () => {
  return (
    <div className="relative px-4 lg:px-6 space-y-4 animate-fadeIn">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {services.map(service => <ServiceCard key={service.title} {...service} />)}
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {additionalServices.map(service => <ServiceCard key={service.title} {...service} />)}
        </div>
      </div>
    </div>
  );
};

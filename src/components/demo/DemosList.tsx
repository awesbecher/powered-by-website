
import { ServiceCard } from "@/components/home/ServiceCard";
import { services } from "@/data/services";

export const DemosList = () => {
  return (
    <div className="relative px-4 py-8 lg:px-6 space-y-8 animate-fadeIn">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map(service => <ServiceCard key={service.title} {...service} />)}
        </div>
      </div>
    </div>
  );
};

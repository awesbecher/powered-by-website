
import { Home, Building, DollarSign, Users } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

export const ServicesSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-0">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <ServiceCard
          icon={Home}
          title="Residential Sales"
          description="Expert guidance in buying or selling your home"
        />
        <ServiceCard
          icon={Building}
          title="Commercial"
          description="Professional commercial property services"
        />
        <ServiceCard
          icon={DollarSign}
          title="Property Valuation"
          description="Accurate market value assessments"
        />
        <ServiceCard
          icon={Users}
          title="Consultation"
          description="Personalized real estate consulting"
        />
      </div>
    </div>
  );
};

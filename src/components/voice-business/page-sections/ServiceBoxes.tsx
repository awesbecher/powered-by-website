
import { Car, Building, Coffee, Briefcase } from "lucide-react";
import { ServiceBox } from "./ServiceBox";

interface ServiceBoxesProps {
  initialLoad: boolean;
  onTryNow?: () => void;
}

export const ServiceBoxes = ({ initialLoad, onTryNow }: ServiceBoxesProps) => {
  const services = [
    {
      icon: Car,
      category: "Auto Dealership",
      businessName: "Mercedes of Tacoma",
      phoneNumber: "(555) 555-5555"
    },
    {
      icon: Building,
      category: "Real Estate",
      businessName: "Township Real Estate",
      phoneNumber: "(555) 555-5555"
    },
    {
      icon: Coffee,
      category: "Restaurant",
      businessName: "The Slice House",
      phoneNumber: "(555) 555-5555"
    },
    {
      icon: Briefcase,
      category: "Retail Services",
      businessName: "Flagship Barbers",
      phoneNumber: "(555) 555-5555"
    }
  ];

  return (
    <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform flex flex-col items-start justify-start
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="text-center w-full mb-6 border border-gray-700/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h3 className="text-white text-2xl font-bold mb-2">Talk to an AI Receptionist Now!</h3>
        <p className="text-gray-300 text-xl mb-2">Call any one of the businesses below.</p>
        <p className="text-gray-200 text-sm italic">Don't worry, they're not actually real businesses.</p>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full">
        {services.map((service, index) => (
          <ServiceBox
            key={index}
            icon={service.icon}
            category={service.category}
            businessName={service.businessName}
            phoneNumber={service.phoneNumber}
            onTryNow={onTryNow}
          />
        ))}
      </div>
    </div>
  );
};

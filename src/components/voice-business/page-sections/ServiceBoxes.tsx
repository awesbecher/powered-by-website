
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
      <p className="text-center text-white text-xl mb-6 font-medium bg-gradient-to-br from-[#6342ff] via-[#7a6cc5] to-[#9b87f5] p-6 rounded-2xl shadow-lg border border-purple-500/20 backdrop-blur-sm w-full">
        Talk to an AI Receptionist Now!
        <span className="block mt-2 text-base">Call any one of the businesses below.</span>
        <span className="block mt-2 text-sm text-gray-200 italic">Don't worry, they're not actually real businesses.</span>
      </p>
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

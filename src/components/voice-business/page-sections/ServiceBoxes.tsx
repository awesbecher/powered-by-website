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
      phoneNumber: "+1 (732) 638 0513"
    },
    {
      icon: Building,
      category: "Real Estate",
      businessName: "Township Real Estate",
      phoneNumber: "+1 (732) 702 8348"
    },
    {
      icon: Coffee,
      category: "Restaurant",
      businessName: "The Slice House",
      phoneNumber: "(657) 464 2712"
    },
    {
      icon: Briefcase,
      category: "Retail Services",
      businessName: "Flagship Barbers",
      phoneNumber: "+1 (978) 818 8357"
    }
  ];

  return (
    <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform flex flex-col items-start justify-start
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* Empty container for future content */}
      </div>
    </div>
  );
};

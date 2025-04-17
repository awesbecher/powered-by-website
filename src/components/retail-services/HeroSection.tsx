
import { Link } from "react-router-dom";
import RetailServicesHeader from "./RetailServicesHeader";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface HeroSectionProps {
  onBookAppointment: () => void;
}

const HeroSection = ({ onBookAppointment }: HeroSectionProps) => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/dac317cc-0dbe-4fbd-9e8b-8f3e4e1ef731.png"
          alt="Professional Barbershop Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full -mb-4">
        <RetailServicesHeader />
      </div>

      <div className="relative flex-grow w-full px-4 lg:px-8 flex items-center">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Never miss a customer call again — even during peak hours.
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            Voice AI that answers, routes, and resolves calls for your store — 24/7.
          </p>
          <div className="mt-6">
            <Button 
              onClick={onBookAppointment}
              className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Book an Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

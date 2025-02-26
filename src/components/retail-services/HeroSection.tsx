
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onBookClick: () => void;
}

const HeroSection = ({ onBookClick }: HeroSectionProps) => {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/dac317cc-0dbe-4fbd-9e8b-8f3e4e1ef731.png"
          alt="Professional Barbershop Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative w-full pt-24 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Welcome to Flagship Barbers
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg mb-8">
            Flagship Barbers has been serving the Tacoma public for 25 years. We specialize in classic barbershop style and fades. Select which services you'd like and then click on Book an Appointment.
          </p>
          <Button 
            onClick={onBookClick}
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-transform duration-200 hover:scale-105"
          >
            Book an Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

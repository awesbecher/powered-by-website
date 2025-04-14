
import { Link } from "react-router-dom";
import RetailServicesHeader from "./RetailServicesHeader";

const HeroSection = () => {
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
            Welcome to Flagship Barbers
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            Flagship Barbers has been serving the Tacoma public for 25 years. We specialize in classic barbershop style and fades. Click on the button below to speak to our Reservations Manager to book a haircut!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

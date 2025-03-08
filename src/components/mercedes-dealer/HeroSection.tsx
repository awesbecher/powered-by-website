
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative h-[60vh] mb-4">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/a03fe01f-a020-43b3-a46c-2fda077f0baf.png"
          alt="Mercedes-Benz Dealership Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center px-4 lg:px-8">
        <Link to="/demo" className="absolute top-8 left-8 text-white hover:text-gray-200 transition-colors">
          ← Back to Demos
        </Link>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Mercedes-Benz of Tacoma
          </h1>
          <p className="text-white max-w-2xl mx-auto text-lg leading-tight">
            Tacoma's Premier Authorized Mercedes-Benz Dealer. Experience luxury and performance with our extensive selection of new and certified pre-owned vehicles. View our special Spring pricing incentives below. Click to talk to a dealership team member now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

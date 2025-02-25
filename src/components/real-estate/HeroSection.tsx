
import { Phone } from "lucide-react";

export const HeroSection = () => {
  return (
    <>
      <div className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#222222]"></div>
        
        <div className="absolute right-0 top-0 w-full lg:w-2/3 h-full">
          <img 
            src="/lovable-uploads/2d9d7374-8cc7-4dee-944c-9614e9d40f77.png"
            alt="Luxury Estate"
            className="w-full h-full object-contain object-right-top opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#222222] via-[#222222]/60 to-transparent"></div>
        </div>
        
        <div className="relative w-full px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-bold mb-6 leading-tight text-white">
                Find Your Luxury Home in Edison Township
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Your trusted partner in Northern New Jersey real estate. Discover exceptional properties in Edison Township's most desirable neighborhoods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

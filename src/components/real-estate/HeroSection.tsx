
import { Phone } from "lucide-react";

export const HeroSection = () => {
  return (
    <>
      <div className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#222222] to-[#222222]"></div>
        
        <div className="absolute right-0 top-0 w-full lg:w-2/3 h-full">
          <img 
            src="/lovable-uploads/2d9d7374-8cc7-4dee-944c-9614e9d40f77.png"
            alt="Luxury Estate"
            className="w-full h-full object-contain object-right-top opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#222222] via-[#222222]/80 to-transparent"></div>
        </div>
        
        <div className="relative w-full px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Find Your Luxury Home in Edison Township
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Your trusted partner in Northern New Jersey real estate. Discover exceptional properties in Edison Township's most desirable neighborhoods.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 -mt-32 mb-16">
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
          <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Speak with an Agent
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-semibold transition-colors">
            View Featured Listings
          </button>
        </div>
      </div>
    </>
  );
};

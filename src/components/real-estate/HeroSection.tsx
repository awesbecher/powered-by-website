import { AspectRatio } from "@/components/ui/aspect-ratio";

export const HeroSection = () => {
  return (
    <div className="relative bg-[#1a0b2e]">
      {/* Background image with overlay */}
      <div className="absolute inset-0 right-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0b2e] via-[#1a0b2e]/80 to-transparent z-10"></div>
        <img 
          src="/assets/images/2d9d7374-8cc7-4dee-944c-9614e9d40f77.png"
          alt="Luxury Estate"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Content container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Logo column - Updated with background for better visibility */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 rounded-lg p-4 shadow-lg max-w-[180px] mx-auto lg:mx-0">
              <AspectRatio ratio={1} className="w-full">
                <img 
                  src="/assets/team/township-realestate.png" 
                  alt="Township Real Estate Logo" 
                  className="object-contain w-full h-full"
                />
              </AspectRatio>
            </div>
          </div>
          
          {/* Text content column */}
          <div className="lg:col-span-9 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white">
              Find Your Luxury Home in Edison Township
            </h1>
            <p className="text-lg text-gray-200 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Your trusted partner in Northern New Jersey real estate. Discover exceptional properties in Edison Township's most desirable neighborhoods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

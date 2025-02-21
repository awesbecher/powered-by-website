
import { Link } from "react-router-dom";
import { Phone, Home, Building, DollarSign, Users } from "lucide-react";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/real-estate/PropertyCard";
import { ServiceCard } from "@/components/real-estate/ServiceCard";
import { HeroSection } from "@/components/real-estate/HeroSection";

const RealEstate = () => {
  return (
    <div className="min-h-screen bg-[#222222] text-white">
      {/* Navigation */}
      <Link 
        to="/" 
        className="fixed top-8 left-8 text-gray-400 hover:text-white transition-colors z-50"
      >
        ← Back
      </Link>

      {/* Logo */}
      <div className="absolute top-8 right-8 z-10">
        <img 
          src="/lovable-uploads/e305eace-d64d-4437-9d8e-533d49b3d934.png"
          alt="Township Real Estate Logo"
          className="h-16 w-auto"
        />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Action Buttons */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 -mt-20 mb-16">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Speak with an Agent
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-semibold transition-colors">
            View Featured Listings
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-0">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            icon={Home}
            title="Residential Sales"
            description="Expert guidance in buying or selling your home"
          />
          <ServiceCard
            icon={Building}
            title="Commercial"
            description="Professional commercial property services"
          />
          <ServiceCard
            icon={DollarSign}
            title="Property Valuation"
            description="Accurate market value assessments"
          />
          <ServiceCard
            icon={Users}
            title="Consultation"
            description="Personalized real estate consulting"
          />
        </div>
      </div>

      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.title} property={property} />
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <div className="bg-accent/10 rounded-lg p-8 text-center border border-accent/20">
          <h2 className="text-2xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Our experienced agents are here to help you navigate the Edison Township real estate market. Contact us today for a personalized consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call Now: (732) 555-0123
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-semibold transition-colors">
              Schedule a Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstate;

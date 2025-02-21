
import { Link } from "react-router-dom";
import { Phone, MapPin, Home, Building, DollarSign, Users } from "lucide-react";

const properties = [
  {
    title: "Modern Colonial",
    price: "$789,000",
    location: "Edison Township",
    specs: "4 bed • 3.5 bath • 2,800 sqft",
    type: "Single Family",
    image: "/lovable-uploads/92d1275c-847a-49ad-a297-792c7bf899a7.png"
  },
  {
    title: "Luxury Townhouse",
    price: "$525,000",
    location: "Edison Township",
    specs: "3 bed • 2.5 bath • 2,100 sqft",
    type: "Townhouse",
    image: "/lovable-uploads/ba13be0d-77b7-49f3-aa99-9524e25c5294.png"
  },
  {
    title: "Contemporary Estate",
    price: "$1,250,000",
    location: "Edison Township",
    specs: "5 bed • 4.5 bath • 4,200 sqft",
    type: "Single Family",
    image: "/lovable-uploads/af07ee0c-70fa-4261-a83e-98ef6108f8ae.png"
  }
];

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
      <div className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#222222] to-[#222222]"></div>
        
        {/* Featured House Image */}
        <div className="absolute right-0 top-0 w-full lg:w-2/3 h-full">
          <img 
            src="/lovable-uploads/2d9d7374-8cc7-4dee-944c-9614e9d40f77.png"
            alt="Luxury Estate"
            className="w-full h-full object-contain object-right-top opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#222222] via-[#222222]/80 to-transparent"></div>
        </div>
        
        {/* Header Content */}
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

      {/* CTA Buttons */}
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

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10">
            <Home className="w-8 h-8 mb-4 text-[#9b87f5]" />
            <h3 className="text-xl font-semibold mb-2">Residential Sales</h3>
            <p className="text-gray-400">Expert guidance in buying or selling your home</p>
          </div>
          <div className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10">
            <Building className="w-8 h-8 mb-4 text-[#9b87f5]" />
            <h3 className="text-xl font-semibold mb-2">Commercial</h3>
            <p className="text-gray-400">Professional commercial property services</p>
          </div>
          <div className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10">
            <DollarSign className="w-8 h-8 mb-4 text-[#9b87f5]" />
            <h3 className="text-xl font-semibold mb-2">Property Valuation</h3>
            <p className="text-gray-400">Accurate market value assessments</p>
          </div>
          <div className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10">
            <Users className="w-8 h-8 mb-4 text-[#9b87f5]" />
            <h3 className="text-xl font-semibold mb-2">Consultation</h3>
            <p className="text-gray-400">Personalized real estate consulting</p>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div 
              key={property.title}
              className="bg-black/50 rounded-lg overflow-hidden border border-white/10 group hover:border-accent/50 transition-all duration-300"
            >
              <div className="relative h-64">
                <img 
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{property.title}</h3>
                  <span className="text-accent font-bold">{property.price}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  {property.location}
                </div>
                <p className="text-gray-400 mb-2">{property.specs}</p>
                <p className="text-gray-500">{property.type}</p>
              </div>
            </div>
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

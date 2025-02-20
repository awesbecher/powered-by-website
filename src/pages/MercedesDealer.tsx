
import { Link } from "react-router-dom";
import { Car, DollarSign, Wrench, Shield, Clock, Phone } from "lucide-react";

const MercedesDealer = () => {
  return (
    <div className="min-h-screen bg-[#222222] text-white">
      {/* Logo */}
      <div className="absolute top-8 right-8">
        <img 
          src="/lovable-uploads/7e5ffc92-3c33-4a4a-8d6d-add3197d2f2f.png"
          alt="Mercedes of Tacoma Logo"
          className="h-16 w-auto"
        />
      </div>

      {/* Header */}
      <div className="relative pt-24 px-4 lg:px-8">
        <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors">
          ← Back
        </Link>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Mercedes-Benz of Tacoma
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4">
            Tacoma's Premier Authorized Mercedes-Benz Dealer. Experience luxury and performance with our extensive selection of new and certified pre-owned vehicles.
          </p>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm p-12 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Spring Sales Event</h2>
            <p className="text-xl mb-6">Exceptional Offers on New 2024 Models</p>
            <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-8 py-3 rounded-md font-semibold transition-colors">
              View Special Offers
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10">
            <Car className="w-8 h-8 mb-4 text-[#9b87f5]" />
            <h3 className="text-xl font-semibold mb-2">New Vehicles</h3>
            <p className="text-gray-400">Explore our full lineup of new Mercedes-Benz vehicles, from luxury sedans to SUVs.</p>
          </div>
          <div className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10">
            <DollarSign className="w-8 h-8 mb-4 text-[#9b87f5]" />
            <h3 className="text-xl font-semibold mb-2">Financing</h3>
            <p className="text-gray-400">Competitive lease and finance options tailored to your needs.</p>
          </div>
          <div className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10">
            <Wrench className="w-8 h-8 mb-4 text-[#9b87f5]" />
            <h3 className="text-xl font-semibold mb-2">Service Center</h3>
            <p className="text-gray-400">Factory-trained technicians and genuine Mercedes-Benz parts.</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <div className="bg-accent/10 rounded-lg p-8 text-center border border-accent/20">
          <h2 className="text-2xl font-bold mb-6">Visit Us Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <Clock className="w-6 h-6 mx-auto mb-2 text-[#9b87f5]" />
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-gray-400">Mon-Sat: 9AM - 7PM<br />Sunday: 10AM - 6PM</p>
            </div>
            <div>
              <Shield className="w-6 h-6 mx-auto mb-2 text-[#9b87f5]" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-400">1701 Alexander Ave E<br />Fife, WA 98424</p>
            </div>
            <div>
              <Phone className="w-6 h-6 mx-auto mb-2 text-[#9b87f5]" />
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-gray-400">Sales: (253) 922-4838<br />Service: (253) 922-4839</p>
            </div>
          </div>
          <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors">
            Schedule a Test Drive
          </button>
        </div>
      </div>
    </div>
  );
};

export default MercedesDealer;


import { Link } from "react-router-dom";
import { Car, DollarSign, Wrench, Shield, Clock, Phone, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const MercedesDealer = () => {
  const [showOffers, setShowOffers] = useState(false);

  return (
    <div className="min-h-screen bg-[#222222] text-white">
      {/* Logo */}
      <div className="absolute top-8 right-8 z-10">
        <img 
          src="/lovable-uploads/7e5ffc92-3c33-4a4a-8d6d-add3197d2f2f.png"
          alt="Mercedes of Tacoma Logo"
          className="h-16 w-auto"
        />
      </div>

      {/* Hero Section with Background Image */}
      <div className="relative h-[60vh] mb-4">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/a03fe01f-a020-43b3-a46c-2fda077f0baf.png"
            alt="Mercedes-Benz Dealership Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Header Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 lg:px-8">
          <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 text-white">
              Mercedes-Benz of Tacoma
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg">
              Tacoma's Premier Authorized Mercedes-Benz Dealer. Experience luxury and performance with our extensive selection of new and certified pre-owned vehicles.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm p-12 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Spring Sales Event</h2>
            <p className="text-xl mb-6">Exceptional Offers on New 2024 Models</p>
            <div className="space-y-4">
              <button 
                className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-8 py-3 rounded-md font-semibold transition-colors"
                onClick={() => setShowOffers(true)}
              >
                View Special Offers
              </button>
              <div>
                <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-8 py-3 rounded-md font-semibold transition-colors">
                  Speak with us now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
        </div>
        
        {/* Centered Service Center Box */}
        <div className="max-w-md mx-auto">
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

      {/* Special Offers Dialog */}
      <Dialog open={showOffers} onOpenChange={setShowOffers}>
        <DialogContent className="bg-[#222222] text-white border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              March Special Offers
              <button
                onClick={() => setShowOffers(false)}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </DialogTitle>
            <DialogDescription className="text-gray-300 space-y-6 pt-4">
              <div className="space-y-4">
                <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-semibold mb-2 text-[#9b87f5]">Spring Bonus Special</h3>
                  <p>Get up to 15% off MSRP on any 2024 Mercedes model in our inventory.</p>
                  <p className="mt-2">Plus, take advantage of our $2,000 down payment option on most 2024 models.</p>
                </div>
                
                <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-semibold mb-2 text-[#9b87f5]">March Leasing Offer</h3>
                  <p>Drive a new Mercedes with zero down payment!</p>
                  <p className="mt-2">Enjoy 20% off your monthly lease payments for the first year.</p>
                </div>

                <div className="text-sm text-gray-400 mt-4">
                  Offer valid March 1st through March 31st, 2024. Terms and conditions apply.
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MercedesDealer;

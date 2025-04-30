import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Share2, Bed, Bath, Square, Phone } from "lucide-react";

interface Property {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          className="w-full h-64 object-cover" 
          src={property.imageUrl} 
          alt={property.name} 
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <Heart className="w-4 h-4 text-gray-700" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <Share2 className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{property.name}</h3>
            <p className="text-gray-600 text-sm">{property.address}</p>
          </div>
          <p className="text-xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
        </div>
        <p className="text-gray-600 mb-4">{property.description}</p>
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex space-x-4">
            <div className="flex items-center text-gray-600">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.beds} beds</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.baths} baths</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            <Phone className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

interface WebsiteContentProps {
  properties: Property[];
  onStartCall?: () => void;
  autoSimulate?: boolean;
}

const WebsiteContent: React.FC<WebsiteContentProps> = ({ properties, onStartCall, autoSimulate = false }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Featured Listings</h1>
            <p className="text-gray-600 mt-1">Discover your dream home in Phoenix, Arizona</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-gray-700">
              Filter
            </Button>
            <Button variant="outline" className="text-gray-700">
              Sort: Newest
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={onStartCall}
          >
            <Phone className="w-5 h-5 mr-2" />
            Talk to an Agent Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteContent;

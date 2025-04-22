import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Property {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={property.imageUrl} alt={property.name} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{property.name}</h3>
        <p className="text-gray-600">{property.description}</p>
        <p className="mt-2 text-blue-500">${property.price}</p>
      </div>
    </div>
  );
};

interface WebsiteContentProps {
  properties: Property[];
}

const WebsiteContent: React.FC<WebsiteContentProps> = ({ properties }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Featured Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            property={property}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default WebsiteContent;

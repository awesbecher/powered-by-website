
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Maximize2, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    image: string;
  };
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card className="overflow-hidden mb-6 bg-white/10 hover:bg-white/15 transition-all border-white/10">
      <div className="relative h-48">
        <img
          src={property.image || '/lovable-uploads/92d1275c-847a-49ad-a297-792c7bf899a7.png'}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-[#9b87f5] text-white px-3 py-1 rounded-full text-sm font-medium">
          {property.price}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{property.title}</h3>
        
        <div className="flex items-center text-gray-300 mb-3">
          <MapPin size={16} className="mr-1" />
          <span>{property.location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          
          <div className="flex items-center">
            <Bath size={16} className="mr-1" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          
          <div className="flex items-center">
            <Maximize2 size={16} className="mr-1" />
            <span>{property.area}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

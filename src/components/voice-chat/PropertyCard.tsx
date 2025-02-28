
import React from "react";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-2 shadow-sm">
      <div className="h-24 rounded-md mb-2 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-sm font-semibold text-gray-800 truncate">{property.price}</div>
      <div className="text-xs text-gray-600 truncate">{property.location}</div>
    </div>
  );
};

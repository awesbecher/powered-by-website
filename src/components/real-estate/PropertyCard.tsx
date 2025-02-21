
import { MapPin } from "lucide-react";
import type { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="bg-black/50 rounded-lg overflow-hidden border border-white/10 group hover:border-accent/50 transition-all duration-300">
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
  );
};


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
        <div className="absolute top-0 right-0 bg-accent/90 text-white px-3 py-1 m-2 rounded-md font-bold">
          {property.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{property.title}</h3>
        <div className="flex items-center gap-2 text-white/80 mb-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="font-medium">{property.location}, NJ</span>
        </div>
        <p className="text-white/70 mb-2">{property.specs}</p>
        <p className="text-white/70">{property.type}</p>
      </div>
    </div>
  );
};

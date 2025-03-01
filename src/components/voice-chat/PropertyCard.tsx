
import React, { useState } from "react";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Generate a placeholder color based on property title (deterministic)
  const generatePlaceholderColor = (title: string) => {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };
  
  const placeholderColor = generatePlaceholderColor(property.title);
  
  return (
    <div className="bg-gray-50 rounded-lg p-2 shadow-sm">
      <div className="h-24 rounded-md mb-2 overflow-hidden relative">
        {/* Placeholder color while image loads */}
        <div 
          className="absolute inset-0 transition-opacity duration-300" 
          style={{ 
            backgroundColor: placeholderColor,
            opacity: imageLoaded ? 0 : 1 
          }} 
        />
        
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="text-sm font-semibold text-gray-800 truncate">{property.price}</div>
      <div className="text-xs text-gray-600 truncate">{property.location}</div>
    </div>
  );
};


import React, { useState, useRef, useEffect } from "react";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(true); // Start as true to avoid showing placeholder
  const imgRef = useRef<HTMLImageElement>(null);
  
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

  // When component mounts, check if image is already in browser cache
  useEffect(() => {
    // Always assume image is loaded
    setImageLoaded(true);
    
    // Preload image in background to ensure it's cached for future visits
    const img = new Image();
    img.src = property.image;
    img.fetchPriority = "high";
  }, [property.image]);
  
  return (
    <div className="bg-gray-50 rounded-lg p-2 shadow-sm">
      <div className="h-24 rounded-md mb-2 overflow-hidden relative">
        {/* Image without placeholder overlay */}
        <img 
          ref={imgRef}
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover"
          style={{ opacity: 1 }}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
      </div>
      <div className="text-sm font-semibold text-gray-800 truncate">{property.price}</div>
      <div className="text-xs text-gray-600 truncate">{property.location}</div>
    </div>
  );
};

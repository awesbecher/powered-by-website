
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { properties } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";

interface WebsiteContentProps {
  onStartCall: () => void;
  autoSimulate?: boolean;
}

export const WebsiteContent = ({ onStartCall, autoSimulate = false }: WebsiteContentProps) => {
  // Get the first 4 properties from our data
  const displayProperties = properties.slice(0, 4);

  return (
    <div className="p-3 bg-white min-h-[500px] max-h-[500px] overflow-hidden relative">
      {/* Logo at top left */}
      <div className="mb-2">
        <img 
          src="/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png" 
          alt="Phoenix Realty Inc. Logo" 
          className="h-18 mb-1" // Changed from h-12 to h-18 (increased by 1.5x)
        />
        <h2 className="text-lg font-bold text-gray-800">Find Your Dream Home</h2>
        <p className="text-sm text-gray-600">Discover beautiful properties that match your lifestyle</p>
      </div>
      
      {/* Property cards with real images */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {displayProperties.map((property, i) => (
          <PropertyCard key={i} property={property} />
        ))}
      </div>
      
      {/* Call to action button - reduced margin top and added fixed bottom positioning */}
      <div className="mt-1 flex justify-center" id="cta-button">
        <Button 
          onClick={onStartCall} 
          className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-3 py-2 rounded-md text-sm"
        >
          <Mic className="w-4 h-4 mr-2" /> Speak to a Real Estate Agent Now
        </Button>
      </div>
      
      {/* Animated cursor for auto simulation */}
      {autoSimulate && (
        <div className="cursor-simulation absolute w-6 h-6 pointer-events-none z-50" />
      )}
    </div>
  );
};

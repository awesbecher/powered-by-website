
import React from 'react';
import { PropertyCard } from "./PropertyCard";
import { properties } from "@/data/properties";

export const FeaturedProperties = () => {
  return (
    <div id="featured-properties" className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <PropertyCard
            key={property.id || index}
            property={property}
          />
        ))}
      </div>
    </div>
  );
};

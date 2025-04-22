import React from 'react';
import { PropertyCard } from "./PropertyCard";

export const FeaturedProperties = ({ properties }) => {
  return (
    <div>
      {properties.map((property) => (
        <PropertyCard 
          property={property} 
          key={property.id || Math.random().toString()}
        />
      ))}
    </div>
  );
};

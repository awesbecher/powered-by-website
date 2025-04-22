
import React from 'react';
import PropertyCard from './PropertyCard';

// Define the Property type interface
export interface Property {
  propertyId: string;  // Use propertyId instead of id
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
}

interface PropertyCardProps {
  property: Property;
}

export const FeaturedProperties = () => {
  const properties: Property[] = [
    {
      propertyId: "prop-1",
      title: "Luxury Downtown Apartment",
      location: "123 Main St, New York, NY",
      price: 750000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      image: "/lovable-uploads/property-1.jpg"
    },
    {
      propertyId: "prop-2",
      title: "Family Home with Garden",
      location: "456 Oak Ave, Los Angeles, CA",
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      image: "/lovable-uploads/property-2.jpg"
    },
    {
      propertyId: "prop-3",
      title: "Modern Beach House",
      location: "789 Shore Dr, Miami, FL",
      price: 1950000,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2100,
      image: "/lovable-uploads/property-3.jpg"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          property={property}
        />
      ))}
    </div>
  );
};

export default FeaturedProperties;

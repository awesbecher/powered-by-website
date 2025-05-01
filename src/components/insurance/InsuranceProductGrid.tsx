import React from 'react';
import { InsuranceProductCard } from "./InsuranceProductCard";

export interface InsuranceProductGridProps {
  selectedProducts: string[];
  onProductSelect: (productId: string) => void;
}

export const InsuranceProductGrid: React.FC<InsuranceProductGridProps> = ({ 
  selectedProducts, 
  onProductSelect 
}) => {
  const products = [
    { id: "health", name: "Health Insurance", icon: "🏥" },
    { id: "life", name: "Life Insurance", icon: "💓" },
    { id: "auto", name: "Auto Insurance", icon: "🚗" },
    { id: "home", name: "Home Insurance", icon: "🏠" },
    { id: "travel", name: "Travel Insurance", icon: "✈️" },
    { id: "pet", name: "Pet Insurance", icon: "🐾" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => (
        <InsuranceProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          icon={product.icon}
          isSelected={selectedProducts.includes(product.id)}
          isEnabled={true}
          onSelect={onProductSelect}
        />
      ))}
    </div>
  );
};

export default InsuranceProductGrid;

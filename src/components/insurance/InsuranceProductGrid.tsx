import React from 'react';
import { InsuranceProductCard, InsuranceProductCardProps } from "./InsuranceProductCard";
import { ForwardRefExoticComponent } from "react";
import { LucideProps } from "lucide-react";

interface InsuranceProductGridProps {
  products: {
    id: string;
    name: string;
    icon: ForwardRefExoticComponent<LucideProps>;
  }[];
  selectedProduct: string | null;
  onProductSelect: (productId: string) => void;
}

export const InsuranceProductGrid: React.FC<InsuranceProductGridProps> = ({ products, selectedProduct, onProductSelect }) => {
  const handleProductSelect = (productId: string) => {
    onProductSelect(productId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <InsuranceProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          icon={product.icon}
          isSelected={product.id === selectedProduct}
          isEnabled={true}
          onSelect={handleProductSelect}
        />
      ))}
    </div>
  );
};

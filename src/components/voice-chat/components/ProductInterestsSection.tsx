
import React from "react";

export interface ProductInterest {
  name: string;
  selected: boolean;
}

interface ProductInterestsSectionProps {
  productInterests: ProductInterest[];
  onProductInterestToggle: (index: number) => void;
}

export const ProductInterestsSection: React.FC<ProductInterestsSectionProps> = ({
  productInterests,
  onProductInterestToggle
}) => {
  return (
    <div>
      <p className="text-gray-300 mb-3">Which Powered_by solution(s) are you interested in?*</p>
      <div className="flex flex-wrap gap-3">
        {productInterests.map((product, index) => (
          <button
            key={product.name}
            type="button"
            onClick={() => onProductInterestToggle(index)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              product.selected 
                ? "bg-purple-600 border-purple-500 text-white" 
                : "bg-[#1a1a1a] border-gray-700 text-gray-300 hover:border-gray-500"
            }`}
          >
            {product.name}
          </button>
        ))}
      </div>
    </div>
  );
};

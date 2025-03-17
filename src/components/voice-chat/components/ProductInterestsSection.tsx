
import React from "react";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-3">
      <Label htmlFor="product-interests" className="text-sm font-medium text-gray-300">
        Which Powered_by solution(s) are you interested in?*
      </Label>
      <div className="flex flex-wrap gap-2" id="product-interests">
        {productInterests.map((product, index) => (
          <button
            key={product.name}
            type="button"
            onClick={() => onProductInterestToggle(index)}
            className={`px-4 py-2 rounded-md border text-sm transition-all ${
              product.selected 
                ? "bg-purple-600 border-purple-500 text-white shadow-inner shadow-purple-700" 
                : "bg-[#1a1a1a] border-gray-700 text-gray-300 hover:border-gray-500 hover:bg-[#222]"
            }`}
          >
            {product.selected && (
              <span className="mr-1">✓</span>
            )}
            {product.name}
          </button>
        ))}
      </div>
    </div>
  );
};

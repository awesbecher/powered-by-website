
import React from "react";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { POWERED_BY_STYLE } from "../hooks/types/contactFormTypes";

export interface ProductInterest {
  name: string;
  selected: boolean;
}

interface ProductInterestsSectionProps {
  productInterests: ProductInterest[];
  onProductInterestToggle: (index: number) => void;
  error?: string;
}

export const ProductInterestsSection: React.FC<ProductInterestsSectionProps> = ({
  productInterests,
  onProductInterestToggle,
  error
}) => {
  const hasSelection = productInterests.some(product => product.selected);
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label htmlFor="product-interests" className="text-sm font-medium text-gray-300">
          Which <span className={POWERED_BY_STYLE}>Powered_by</span> solution(s) are you interested in?*
        </Label>
        {productInterests.some(p => p.selected) ? (
          <span className="text-green-500 flex items-center gap-1 text-xs">
            <CheckCircle2 className="h-3 w-3" /> Valid
          </span>
        ) : error ? (
          <span className="text-red-500 flex items-center gap-1 text-xs">
            <AlertCircle className="h-3 w-3" /> Required
          </span>
        ) : null}
      </div>
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
            } ${error && !hasSelection ? "border-red-500" : ""}`}
          >
            {product.selected && (
              <span className="mr-1">✓</span>
            )}
            {product.name}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

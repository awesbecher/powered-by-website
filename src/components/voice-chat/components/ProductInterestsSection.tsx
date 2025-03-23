
import React from "react";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

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
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="product-interests" className="text-xs font-medium text-gray-300">
          Which <PoweredByText className="text-xs px-1" /> solution(s) are you interested in?*
        </Label>
        {productInterests.some(p => p.selected) ? (
          <span className="text-green-500 flex items-center gap-1 text-[10px]">
            <CheckCircle2 className="h-2.5 w-2.5" /> Valid
          </span>
        ) : error ? (
          <span className="text-red-500 flex items-center gap-1 text-[10px]">
            <AlertCircle className="h-2.5 w-2.5" /> Required
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-1.5" id="product-interests">
        {productInterests.map((product, index) => (
          <button
            key={product.name}
            type="button"
            onClick={() => onProductInterestToggle(index)}
            className={`px-2 py-1 rounded-md border text-xs transition-all ${
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
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
};

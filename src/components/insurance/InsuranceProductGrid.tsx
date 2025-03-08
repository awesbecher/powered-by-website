
import { InsuranceProductCard } from "@/components/insurance/InsuranceProductCard";
import { Car, Home, Key, Bike, Sailboat } from "lucide-react";

interface InsuranceProductGridProps {
  selectedProducts: string[];
  onProductSelect: (productId: string) => void;
}

const InsuranceProductGrid = ({ 
  selectedProducts, 
  onProductSelect 
}: InsuranceProductGridProps) => {
  const insuranceProducts = [
    { id: 'auto', name: 'Auto', icon: Car },
    { id: 'home', name: 'Homeowners', icon: Home },
    { id: 'renters', name: 'Renters', icon: Key },
    { id: 'motorcycle', name: 'Motorcycle / ATV', icon: Bike },
    { id: 'boat', name: 'Boat', icon: Sailboat },
  ];

  return (
    <div className="space-y-4">
      <p className="text-xl text-gray-300 font-bold">
        Our Products:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insuranceProducts.map((product) => (
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
    </div>
  );
};

export default InsuranceProductGrid;


import { LucideIcon } from "lucide-react";

interface InsuranceProductCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  isSelected: boolean;
  isEnabled: boolean;
  onSelect: (id: string) => void;
}

export const InsuranceProductCard = ({
  id,
  name,
  icon: Icon,
  isSelected,
  isEnabled,
  onSelect,
}: InsuranceProductCardProps) => {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`
        p-6 rounded-lg flex flex-col items-center justify-center space-y-4 
        transition-all duration-200
        bg-white/10 hover:bg-white/20 cursor-pointer
        ${isSelected ? 'ring-2 ring-accent' : ''}
      `}
    >
      <Icon className="h-8 w-8 text-accent" />
      <span className="text-lg text-gray-300">{name}</span>
    </button>
  );
};

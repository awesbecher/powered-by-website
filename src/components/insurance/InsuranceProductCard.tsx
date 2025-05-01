import React from 'react';

interface InsuranceProductCardProps {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
  isEnabled: boolean;
  onSelect: (id: string) => void;
}

export const InsuranceProductCard: React.FC<InsuranceProductCardProps> = ({
  id,
  name,
  icon,
  isSelected,
  isEnabled,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(id)}
      disabled={!isEnabled}
      className={`
        p-6 rounded-lg flex flex-col items-center justify-center space-y-4 
        transition-all duration-200 w-full
        ${isEnabled ? 'bg-white/10 hover:bg-white/20 cursor-pointer' : 'bg-white/5 cursor-not-allowed'}
        ${isSelected ? 'ring-2 ring-accent shadow-lg' : ''}
      `}
    >
      <span className="text-4xl" role="img" aria-label={name}>
        {icon}
      </span>
      <span className="text-lg text-gray-300 font-medium">{name}</span>
    </button>
  );
};

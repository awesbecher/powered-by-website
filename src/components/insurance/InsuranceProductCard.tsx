import React from 'react';

interface InsuranceProductCardProps {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
  isEnabled: boolean;
  onSelect: (id: string) => void;
}

export const InsuranceProductCard = ({
  id,
  name,
  icon,
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
      <span className="text-4xl">{icon}</span>
      <span className="text-lg text-gray-300">{name}</span>
    </button>
  );
};

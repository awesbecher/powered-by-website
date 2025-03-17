
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

interface OfferButtonProps {
  className?: string;
}

const OfferButton: React.FC<OfferButtonProps> = ({ className }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <Link
        to="/contact"
        className="relative flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      >
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1A0B2E] text-white rounded-full">
          <Bot className="w-4 h-4" />
          <span className="text-sm font-semibold">New Offer</span>
        </div>
        <span className="text-sm font-medium pr-1 group-hover:underline">
          Build a <span className="text-[#9b87f5] font-semibold">Free</span> Voice AI Agent Today for any Business Use Case
        </span>
      </Link>
    </div>
  );
};

export default OfferButton;

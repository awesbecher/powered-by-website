import React from 'react';
import { Phone } from "lucide-react";

interface ActionButtonsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ActionButtons({ setIsOpen }: ActionButtonsProps) {
  return (
    <div className="container mx-auto px-4 -mt-8 relative z-10 mb-24">
      <div className="flex justify-center">
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-full sm:w-auto min-w-[280px] bg-gradient-to-r from-[#6342ff] to-[#8c6dff] hover:from-[#7254ff] hover:to-[#9e83ff] text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#6342ff]/0 via-white/10 to-[#6342ff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
          <div className="relative flex items-center justify-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-lg font-semibold">
              Talk to a Real Estate Agent Now
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

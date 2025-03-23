
import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const TestimonialCard = ({ quote, name, role, initials }: TestimonialCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center mb-4">
        <Star className="text-yellow-400 w-4 h-4" fill="#facc15" />
        <Star className="text-yellow-400 w-4 h-4" fill="#facc15" />
        <Star className="text-yellow-400 w-4 h-4" fill="#facc15" />
        <Star className="text-yellow-400 w-4 h-4" fill="#facc15" />
        <div className="relative w-4 h-4">
          <Star className="text-yellow-400 w-4 h-4 absolute top-0 left-0" />
          <div className="absolute top-0 left-0 w-3/4 h-4 overflow-hidden">
            <Star className="text-yellow-400 w-4 h-4" fill="#facc15" />
          </div>
        </div>
      </div>
      <p className="text-gray-300 mb-6 italic">
        {quote}
      </p>
      <div className="flex items-center">
        <div className="mr-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center text-white font-bold">
            {initials}
          </div>
        </div>
        <div>
          <p className="text-white font-medium">{name}</p>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

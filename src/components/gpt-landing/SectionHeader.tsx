
import React from "react";

interface SectionHeaderProps {
  title: string;
  initialLoad: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, initialLoad }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#9b87f5]/50"></div>
      <h2 className={`text-3xl sm:text-4xl font-bold text-white text-center transition-all duration-1000 ease-out transform delay-400 ${
        initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        {title}
      </h2>
      <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#9b87f5]/50"></div>
    </div>
  );
};

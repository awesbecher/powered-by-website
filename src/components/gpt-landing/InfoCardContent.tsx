
import React from "react";

interface InfoCardContentProps {
  title: string;
  children: React.ReactNode;
}

export const InfoCardContent: React.FC<InfoCardContentProps> = ({ title, children }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 p-5 rounded-lg hover:bg-white/10 transition-all duration-300">
        <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">{title}</h4>
        {children}
      </div>
    </div>
  );
};

export const InfoCardListItem: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <li className="text-gray-300">{children}</li>;
};

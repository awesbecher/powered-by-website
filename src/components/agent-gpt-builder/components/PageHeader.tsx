
import React from "react";

interface PageHeaderProps {
  initialLoad: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ initialLoad }) => {
  return (
    <div className={`text-center mb-8 transition-all duration-1000 ease-out transform ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-[#9b87f5] to-[#6a5acd] bg-clip-text text-transparent mb-4 leading-tight tracking-tight drop-shadow-[0_4px_10px_rgba(155,135,245,0.3)]">
        Build Your Voice AI Agent
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in font-medium leading-relaxed tracking-wide opacity-80">
        Build a tailored AI voice agent for your business using our agent builder. 
        Receive support in crafting your voice agent's personality, knowledge, and response style.
      </p>
    </div>
  );
};

export default PageHeader;

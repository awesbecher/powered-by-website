
import React from "react";

interface PageHeaderProps {
  initialLoad: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ initialLoad }) => {
  return (
    <div className={`text-center mb-8 transition-all duration-1000 ease-out transform ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#a87cff] bg-clip-text text-transparent mb-4">Build Your Voice AI Agent</h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Create a customized voice agent for your business by chatting with our AI assistant.
        Get help designing your agent's personality, knowledge base, and response patterns.
      </p>
    </div>
  );
};

export default PageHeader;

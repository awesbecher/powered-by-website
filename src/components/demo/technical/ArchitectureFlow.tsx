
import React from "react";

const ArchitectureFlow = () => {
  return (
    <div className="relative">
      {/* Input Stage */}
      <div className="relative mb-16">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h4 className="text-lg font-bold text-white mb-2">Input Processing</h4>
          <p className="text-gray-300">Voice recognition, natural language understanding, and intent classification</p>
        </div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 h-12 w-0.5 bg-gradient-to-b from-[#6342ff] to-[#9b87f5]"></div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-8 w-8 rounded-full border-2 border-[#9b87f5] flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-[#6342ff]"></div>
        </div>
      </div>
      
      {/* Processing Stage */}
      <div className="relative mb-16">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h4 className="text-lg font-bold text-white mb-2">AI Processing Engine</h4>
          <p className="text-gray-300">Context management, knowledge base integration, and response generation</p>
        </div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 h-12 w-0.5 bg-gradient-to-b from-[#6342ff] to-[#9b87f5]"></div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-8 w-8 rounded-full border-2 border-[#9b87f5] flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-[#6342ff]"></div>
        </div>
      </div>
      
      {/* Output Stage */}
      <div className="relative">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h4 className="text-lg font-bold text-white mb-2">Output Delivery</h4>
          <p className="text-gray-300">High-quality voice synthesis, text formatting, or channel-specific delivery</p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureFlow;

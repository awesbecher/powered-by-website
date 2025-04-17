
import React from 'react';
import { Clock, Package, PhoneForwarded } from "lucide-react";

const RetailUseCaseExplainer = () => {
  const useCases = [
    {
      icon: <Clock className="w-12 h-12 text-[#9b87f5]" />,
      emoji: "🕒",
      title: "Store Hours & Info",
      description: "Answers common questions about your business hours, location, services, and policies.",
    },
    {
      icon: <Package className="w-12 h-12 text-[#9b87f5]" />,
      emoji: "📦",
      title: "Inventory Inquiries",
      description: "Checks item availability or routes specific product questions to the right department.",
    },
    {
      icon: <PhoneForwarded className="w-12 h-12 text-[#9b87f5]" />,
      emoji: "🔁",
      title: "Call Routing",
      description: "Sends calls to the right department or store location based on customer needs.",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {useCases.map((useCase, index) => (
        <div 
          key={index} 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center"
        >
          <div className="mb-4">
            {useCase.icon}
          </div>
          <h3 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
            <span>{useCase.emoji}</span>
            <span>{useCase.title}</span>
          </h3>
          <p className="text-gray-300">
            {useCase.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RetailUseCaseExplainer;


import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PricingHeaderProps {
  isAnnual: boolean;
  setIsAnnual: (value: boolean) => void;
}

const PricingHeader = ({ isAnnual, setIsAnnual }: PricingHeaderProps) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Simple <span className="text-[#9b87f5]">Agent</span> Pricing
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Get started quickly & affordably. Just powerful AI agents that grow with your business.
      </p>
      
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className={`text-sm font-medium ${!isAnnual ? "text-white" : "text-gray-400"}`}>
          Monthly Billing
        </span>
        <Switch 
          checked={isAnnual} 
          onCheckedChange={setIsAnnual} 
          className="data-[state=checked]:bg-[#9b87f5]"
        />
        <span className={`text-sm font-medium ${isAnnual ? "text-white" : "text-gray-400"}`}>
          Annual Billing
          <span className="ml-1.5 bg-[#9b87f5]/20 text-[#9b87f5] text-xs font-bold px-2 py-0.5 rounded-full">Save 20%</span>
        </span>
      </div>
    </div>
  );
};

export default PricingHeader;

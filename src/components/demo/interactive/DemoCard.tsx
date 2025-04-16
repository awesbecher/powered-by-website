
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DemoOption } from "./DemoData";

interface DemoCardProps {
  option: DemoOption;
  onShowDemo: () => void;
}

export const DemoCard = ({ option, onShowDemo }: DemoCardProps) => {
  let features = [];
  
  switch(option.id) {
    case "real-estate":
      features = [
        "Property listing and viewing scheduling",
        "Personalized property recommendations",
        "Instant answers to property questions"
      ];
      break;
    case "auto-dealer":
      features = [
        "Vehicle specifications and comparisons",
        "Test drive scheduling and appointment management",
        "Financing options and service inquiries"
      ];
      break;
    case "hospitality":
      features = [
        "Room service ordering and customization",
        "Hotel amenity information and booking",
        "Local recommendations and concierge services"
      ];
      break;
    case "retail":
      features = [
        "Appointment booking and management",
        "Service inquiries and product information",
        "Personalized recommendations and follow-ups"
      ];
      break;
    default:
      features = [
        "Natural language understanding for human-like interactions",
        "Contextual awareness to maintain conversation flow",
        "Seamless integration with existing business systems"
      ];
  }

  return (
    <div className="bg-gradient-to-r from-[#1a0f2e] to-[#2a1c49] rounded-3xl border border-gray-800 overflow-hidden shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 lg:p-12">
          <div className={`${option.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
            <option.icon className="h-7 w-7 text-white" />
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">{option.title}</h3>
          
          <p className="text-gray-300 mb-6 text-lg">
            {option.description}
          </p>
          
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-2 mt-1 text-[#9b87f5]">•</div>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button 
            onClick={onShowDemo}
            className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-6 py-6 text-lg rounded-xl"
          >
            {option.actionText} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="bg-[#0f0a19] p-8 lg:p-0 flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <img 
              src={option.imageSrc}
              alt={`${option.title} demo`}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-sm text-white font-medium">{option.title} Demo</p>
            </div>
            {option.isPopular && (
              <div className="absolute top-4 right-4 bg-[#6342ff] px-3 py-1 rounded-full">
                <p className="text-xs text-white font-medium">Most Popular</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

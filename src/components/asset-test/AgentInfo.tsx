
import React from "react";
import { AgentType } from "./types";

interface AgentInfoProps {
  selectedAgent: AgentType;
}

const AgentInfo: React.FC<AgentInfoProps> = ({ selectedAgent }) => {
  // Display different text for insurance, auto dealership, and restaurant agents
  const isInsuranceAgent = selectedAgent.id === "insurance-quote";
  const isAutoDealershipAgent = selectedAgent.id === "auto-dealership";
  const isRestaurantAgent = selectedAgent.id === "restaurant-order";
  const isRealEstateAgent = selectedAgent.id === "real-estate";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center">
        {isInsuranceAgent ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-[#9b87f5]">
              OR call the AI Agent directly for the Insurance use case using this phone number:
            </h2>
            <div className="bg-white text-black rounded-full py-3 px-8 font-bold text-xl inline-block">
              (575) 305 9390
            </div>
          </>
        ) : isAutoDealershipAgent ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-[#9b87f5]">
              OR call the AI Agent directly for the Auto Dealership use case using this phone number:
            </h2>
            <div className="bg-white text-black rounded-full py-3 px-8 font-bold text-xl inline-block">
              {selectedAgent.phoneNumber}
            </div>
          </>
        ) : isRestaurantAgent ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-[#9b87f5]">
              OR call the AI Agent directly for the Restaurant use case using this phone number:
            </h2>
            <div className="bg-white text-black rounded-full py-3 px-8 font-bold text-xl inline-block">
              (657) 464 2712
            </div>
          </>
        ) : isRealEstateAgent ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-[#9b87f5]">
              OR call the AI Agent directly for the Real Estate use case using this phone number:
            </h2>
            <div className="bg-white text-black rounded-full py-3 px-8 font-bold text-xl inline-block">
              (732) 702 8348
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-[#9b87f5]">
              Try {selectedAgent.name} AI
            </h2>
            <p className="text-gray-300 mb-6">
              Call the number below to interact with our {selectedAgent.name} assistant
            </p>
            <div className="bg-white text-black rounded-full py-3 px-8 font-bold text-xl inline-block">
              {selectedAgent.phoneNumber}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AgentInfo;

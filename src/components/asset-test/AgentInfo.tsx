
import React from "react";
import { AgentType } from "./types";

interface AgentInfoProps {
  selectedAgent: AgentType;
}

const AgentInfo: React.FC<AgentInfoProps> = ({ selectedAgent }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4 text-[#9b87f5]">
          Try {selectedAgent.name} AI
        </h2>
        <p className="text-gray-300 mb-6">
          Call the number below to interact with our {selectedAgent.name} assistant
        </p>
        <div className="bg-white text-black rounded-full py-3 px-8 font-bold text-xl inline-block">
          {selectedAgent.phoneNumber}
        </div>
      </div>
    </div>
  );
};

export default AgentInfo;

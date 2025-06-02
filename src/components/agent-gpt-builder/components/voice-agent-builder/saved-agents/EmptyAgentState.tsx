
import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyAgentStateProps {
  onBrowseTemplates: () => void;
}

const EmptyAgentState: React.FC<EmptyAgentStateProps> = ({ onBrowseTemplates }) => {
  return (
    <div className="text-center py-12 bg-[#1A1F2C]/60 rounded-lg">
      <h3 className="text-white text-xl mb-4">No Saved Agents</h3>
      <p className="text-gray-300 mb-6">You haven't saved any agents yet. Create one from a template to get started.</p>
      <Button 
        onClick={onBrowseTemplates} 
        className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
      >
        Browse Templates
      </Button>
    </div>
  );
};

export default EmptyAgentState;

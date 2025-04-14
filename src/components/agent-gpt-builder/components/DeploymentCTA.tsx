
import React from "react";
import { Button } from "@/components/ui/button";

const DeploymentCTA: React.FC = () => {
  return (
    <div className="mt-16 text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-4">Deploy Your Voice Agent in Minutes</h2>
      <p className="text-gray-300 mb-8">
        Once you've designed your agent, deploy it to answer calls, schedule appointments,
        and provide information 24/7. No coding required.
      </p>
      <Button className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-[#9b87f5]/20">
        Ready to Deploy Your Agent? Contact Us
      </Button>
    </div>
  );
};

export default DeploymentCTA;

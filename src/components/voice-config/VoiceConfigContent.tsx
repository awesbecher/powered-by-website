
import React from 'react';
import { PoweredByText } from "@/components/shared/PoweredByText";

const VoiceConfigContent = () => {
  return (
    <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-160px)] flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <PoweredByText />
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Let's Build Your AI Agent
          </h1>
          
          <p className="text-gray-600 mb-8">
            Talk to our voice assistant and we'll handle the rest
          </p>

          {/* PlayHT agent will be injected here */}
          <div id="playht-agent-container" className="min-h-[400px] flex items-center justify-center">
            <div className="text-gray-400">Loading voice agent...</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VoiceConfigContent;

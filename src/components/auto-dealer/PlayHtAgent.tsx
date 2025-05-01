import React, { useEffect } from 'react';
import { openPlayHtAgent } from '@/services/playhtService';

declare global {
  interface Window {
    PlayAI: {
      open: (agentId: string) => void;
    };
  }
}

const AGENT_ID = 'Chris-Cambridge-Wigagb2b9pwC1a_jVeLTj';

interface Props {
  className?: string;
}

export const PlayHtAgent: React.FC<Props> = ({ className = '' }) => {
  const handleStartChat = () => {
    openPlayHtAgent();
  };

  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={handleStartChat}
        className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
      >
        Talk to an AI Agent
      </button>
    </div>
  );
};

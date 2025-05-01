// Play.ht agent configuration
export const PLAYHT_CONFIG = {
  // Agent ID from Play.ht dashboard
  agentId: 'Chris-Cambridge-Wigagb2b9pwC1a_jVeLTj',
  // Embed URL for the agent
  embedUrl: 'https://app.play.ht/agents/agent/Chris-Cambridge-Wigagb2b9pwC1a_jVeLTj'
};

// Add TypeScript declaration for the Play.ht SDK
declare global {
  interface Window {
    PlayAI: {
      open: (agentId: string) => void;
    };
  }
}

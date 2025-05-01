export const PLAYHT_CONFIG = {
  agentId: 'MxWrNcBzfCl2Aqf7j61CR'
};

export function openPlayHtAgent() {
  // Load the Play.ht web SDK script
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://play-ai.github.io/web-sdk/index.js';
  script.onload = () => {
    if (window.PlayAI) {
      window.PlayAI.open(PLAYHT_CONFIG.agentId);
    }
  };
  document.body.appendChild(script);
}

// Add TypeScript declaration for the Play.ht SDK
declare global {
  interface Window {
    PlayAI: {
      open: (agentId: string) => void;
    };
  }
}

import * as PlayHT from 'playht';

export const PLAYHT_CONFIG = {
  userId: '16zUlybb44eMncP6s4b2WP7pwby1',
  apiKey: 'ak-6fddb38853cf46aaba7ff7a50f44b712',
  agentId: 'Chris-Cambridge-Wigagb2b9pwC1a_jVeLTj'
};

let isInitialized = false;

export function initializePlayHT() {
  if (!isInitialized) {
    PlayHT.init({
      userId: PLAYHT_CONFIG.userId,
      apiKey: PLAYHT_CONFIG.apiKey,
    });
    isInitialized = true;
  }
}

export function openPlayHtAgent() {
  // Load the Play.ht SDK script
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://play-ai.github.io/web-sdk/index.js';
  script.onload = () => {
    if (window.PlayAI) {
      window.PlayAI.open('MxWrNcBzfCl2Aqf7j61CR');
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

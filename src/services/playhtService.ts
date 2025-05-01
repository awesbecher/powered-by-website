export const PLAYHT_CONFIG = {
  agentId: 'MxWrNcBzfCl2Aqf7j61CR'
};

// Load the Play.ht SDK script if it hasn't been loaded yet
const loadPlayHtScript = () => {
  if (document.querySelector('script[src*="play-ai.github.io"]')) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://play-ai.github.io/web-sdk/index.js';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export async function openPlayHtAgent() {
  try {
    await loadPlayHtScript();
    // Wait a bit for the SDK to initialize
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (window.PlayAI) {
      window.PlayAI.open(PLAYHT_CONFIG.agentId);
    } else {
      console.error('Play.ht SDK not initialized');
    }
  } catch (error) {
    console.error('Error loading Play.ht SDK:', error);
  }
}

// Add TypeScript declaration for the Play.ht SDK
declare global {
  interface Window {
    PlayAI: {
      open: (agentId: string) => void;
    };
  }
}

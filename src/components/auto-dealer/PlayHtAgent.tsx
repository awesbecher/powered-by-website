import React, { useEffect } from 'react';

declare global {
  interface Window {
    PlayAI: {
      open: (agentId: string) => void;
    };
  }
}

const AGENT_ID = 'Chris-Cambridge-Wigagb2b9pwC1a_jVeLTj';

export const openPlayHtAgent = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://play-ai.github.io/web-sdk/index.js';
    script.onload = () => {
      if (window.PlayAI) {
        window.PlayAI.open(AGENT_ID);
      }
    };
    document.body.appendChild(script);
  }
};

export const PlayHtAgent = () => {
  useEffect(() => {
    // Pre-load the Play.ht script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://play-ai.github.io/web-sdk/index.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://play-ai.github.io/web-sdk/index.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return null;
};

import React, { useEffect } from 'react';

declare global {
  interface Window {
    PlayAI: {
      open: (agentId: string) => void;
    };
  }
}

export const openPlayHtAgent = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/@play-ai/agent-web-sdk@ht';
    script.onload = () => {
      if (window.PlayAI) {
        window.PlayAI.open('MxWrNcBzfCl2Aqf7j61CR');
      }
    };
    document.body.appendChild(script);
  }
};

export const PlayHtAgent = () => {
  useEffect(() => {
    // Load the Play.ht script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/@play-ai/agent-web-sdk@ht';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/@play-ai/agent-web-sdk@ht"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return null;
};

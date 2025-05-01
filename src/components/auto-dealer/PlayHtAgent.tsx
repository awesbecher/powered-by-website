import React, { useEffect } from 'react';

declare global {
  interface Window {
    PlayAI: {
      open: (agentId: string) => void;
    };
  }
}

export const openPlayHtAgent = () => {
  if (window.PlayAI) {
    window.PlayAI.open('MxWrNcBzfCl2Aqf7j61CR');
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
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

import React, { useEffect } from 'react';
import { PLAYHT_CONFIG } from '@/services/playhtService';

declare global {
  interface Window {
    PlayAI: {
      open: (agentId: string) => void;
    };
  }
}

export const openPlayHtAgent = async () => {
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('https://api.play.ht/api/v2/agents/connect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PLAYHT_CONFIG.secretKey}`,
          'X-User-ID': PLAYHT_CONFIG.userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agentId: PLAYHT_CONFIG.agentId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to connect to Play.ht agent');
      }

      const data = await response.json();
      console.log('Connected to Play.ht agent:', data);

    } catch (error) {
      console.error('Error connecting to Play.ht agent:', error);
    }
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

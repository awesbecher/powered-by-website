
import { useEffect } from 'react';

export function useVapiIntegration() {
  useEffect(() => {
    // Dispatch custom events from Vapi's callbacks
    if ((window as any).vapi) {
      console.log("Found existing vapi object in window, adding event dispatchers");
      
      const originalInitVoicebot = (window as any).vapi.initVoicebot;
      if (originalInitVoicebot) {
        (window as any).vapi.initVoicebot = (config: any) => {
          // Add our custom event dispatchers to the config
          const enhancedConfig = {
            ...config,
            onConversationStarted: () => {
              document.dispatchEvent(new CustomEvent('vapi-conversation-started'));
              if (config.onConversationStarted) config.onConversationStarted();
            },
            onConversationEnded: () => {
              document.dispatchEvent(new CustomEvent('vapi-conversation-ended'));
              if (config.onConversationEnded) config.onConversationEnded();
            },
            onError: (error: any) => {
              document.dispatchEvent(new CustomEvent('vapi-error', { detail: error }));
              if (config.onError) config.onError(error);
            }
          };
          
          return originalInitVoicebot.call((window as any).vapi, enhancedConfig);
        };
        
        console.log("Enhanced vapi.initVoicebot with custom event dispatchers");
      }
    }
    
    // Setup browser checks for common Vapi integration issues
    const checkBrowserCompatibility = () => {
      if (navigator.userAgent.includes('Firefox')) {
        console.warn("Firefox detected: Vapi may have limitations with Firefox's WebRTC implementation");
      }
      
      // Check for private/incognito mode without using RequestFileSystem API
      try {
        const testKey = 'test-private-browsing';
        localStorage.setItem(testKey, '1');
        localStorage.removeItem(testKey);
        console.log("Not in private/incognito mode");
      } catch (e) {
        console.warn("Private/Incognito mode detected: This may affect microphone permissions");
      }
    };
    
    checkBrowserCompatibility();
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  return {
    checkVapiStatus: () => {
      return {
        scriptLoaded: Boolean(document.querySelector('script[src*="vapi.ai"]')),
        vapiObjectExists: Boolean((window as any).vapi),
        vapiRootExists: Boolean(document.getElementById('vapi-root')),
        vapiChildrenCount: document.getElementById('vapi-root')?.childElementCount || 0
      };
    },
    triggerVapiCall: () => {
      console.log("Manual Vapi call trigger");
      document.dispatchEvent(new CustomEvent('open-voice-dialog'));
    }
  };
}

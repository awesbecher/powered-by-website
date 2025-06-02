
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export function useVapiIntegration() {
  const { toast } = useToast();
  
  useEffect(() => {
    // Setup browser checks for common integration issues
    const checkBrowserCompatibility = () => {
      if (navigator.userAgent.includes('Firefox')) {
        console.warn("Firefox detected: Voice features may have limitations with Firefox's WebRTC implementation");
      }
      
      // Check for private/incognito mode
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

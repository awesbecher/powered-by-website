
interface VapiConfig {
  apiKey: string;
  assistantId: string;
}

const DEFAULT_VAPI_CONFIG: VapiConfig = {
  apiKey: 'a212f18f-9d02-4703-914f-ac89661262c5',
  assistantId: 'ebb38ba5-321a-49e4-b860-708bc864327f'
};

// Create a custom event to trigger the voice dialog
export async function initiateVapiCall(): Promise<void> {
  try {
    console.log('Initiating AI voice call with assistant ID:', DEFAULT_VAPI_CONFIG.assistantId);
    
    // Dispatch event for our custom UI
    const event = new CustomEvent('open-voice-dialog');
    document.dispatchEvent(event);
    
    // Clean up any existing Vapi elements first
    const existingScript = document.querySelector('script[src="https://cdn.vapi.ai/messenger.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    let vapiRoot = document.getElementById('vapi-root');
    if (vapiRoot) {
      while (vapiRoot.firstChild) {
        vapiRoot.removeChild(vapiRoot.firstChild);
      }
    } else {
      vapiRoot = document.createElement('div');
      vapiRoot.id = 'vapi-root';
      vapiRoot.style.position = 'absolute';
      vapiRoot.style.top = '-1px';
      vapiRoot.style.left = '-1px';
      vapiRoot.style.width = '1px';
      vapiRoot.style.height = '1px';
      document.body.appendChild(vapiRoot);
    }
    
    // Connect to Vapi service directly using their embedded script
    // This will actually connect to the voice service
    const script = document.createElement('script');
    script.src = 'https://cdn.vapi.ai/messenger.js';
    script.async = true;
    
    // We need to ensure the script is loaded before initializing
    script.onload = () => {
      if ((window as any).vapi) {
        console.log('Vapi script loaded, starting voice call');
        
        // Small delay to ensure Vapi is fully loaded
        setTimeout(() => {
          try {
            (window as any).vapi.initVoicebot({
              assistant_id: DEFAULT_VAPI_CONFIG.assistantId,
              api_key: DEFAULT_VAPI_CONFIG.apiKey,
              audio: {
                autoplay: true, // Auto-play audio response
                target_element_id: 'vapi-root', // Target element
              },
              // Ensure we're using microphone input
              input_mode: 'microphone',
              // Add logging to help debug
              debug: true
            });
            console.log('Vapi initVoicebot called successfully');
          } catch (initError) {
            console.error('Error initializing Vapi voicebot:', initError);
          }
        }, 300);
      } else {
        console.error('Vapi script loaded but vapi object not found');
      }
    };
    
    // Handle script loading errors
    script.onerror = (err) => {
      console.error('Error loading Vapi script:', err);
      return Promise.reject('Failed to load Vapi script');
    };
    
    document.body.appendChild(script);
    
    console.log('Voice dialog event triggered and Vapi service loading started');
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error initiating AI voice call:', error);
    return Promise.reject(error);
  }
}

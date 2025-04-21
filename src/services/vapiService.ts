
interface VapiConfig {
  apiKey: string;
  assistantId: string;
}

// Updated API key and assistant ID
const DEFAULT_VAPI_CONFIG: VapiConfig = {
  apiKey: 'a212f18f-9d02-4703-914f-ac89661262c5', // Updated to new API key
  assistantId: 'ebb38ba5-321a-49e4-b860-708bc864327f' // Updated to new assistant ID
};

// Create a custom event to trigger the voice dialog
export async function initiateVapiCall(): Promise<void> {
  try {
    console.log('Initiating AI voice call with assistant ID:', DEFAULT_VAPI_CONFIG.assistantId);
    console.log('Using API key:', DEFAULT_VAPI_CONFIG.apiKey.substring(0, 8) + '...');
    
    // Dispatch event for our custom UI
    const event = new CustomEvent('open-voice-dialog');
    document.dispatchEvent(event);
    console.log('Dispatched open-voice-dialog event');
    
    // Clean up any existing Vapi elements first
    cleanupExistingVapiElements();
    
    // Create vapi-root element if it doesn't exist
    ensureVapiRootExists();
    
    // Load the Vapi script
    await loadVapiScript();
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error initiating AI voice call:', error);
    return Promise.reject(error);
  }
}

// Helper function to clean up existing Vapi elements
function cleanupExistingVapiElements(): void {
  const existingScript = document.querySelector('script[src="https://cdn.vapi.ai/messenger.js"]');
  if (existingScript) {
    existingScript.remove();
    console.log('Removed existing Vapi script');
  }
  
  let vapiRoot = document.getElementById('vapi-root');
  if (vapiRoot) {
    while (vapiRoot.firstChild) {
      vapiRoot.removeChild(vapiRoot.firstChild);
    }
    console.log('Cleared existing Vapi root element');
  }
}

// Helper function to ensure vapi-root element exists
function ensureVapiRootExists(): void {
  let vapiRoot = document.getElementById('vapi-root');
  if (!vapiRoot) {
    vapiRoot = document.createElement('div');
    vapiRoot.id = 'vapi-root';
    vapiRoot.style.position = 'absolute';
    vapiRoot.style.top = '-1px';
    vapiRoot.style.left = '-1px';
    vapiRoot.style.width = '1px';
    vapiRoot.style.height = '1px';
    document.body.appendChild(vapiRoot);
    console.log('Created new Vapi root element');
  }
}

// Helper function to load Vapi script and initialize voicebot
function loadVapiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.vapi.ai/messenger.js';
    script.async = true;
    
    // We need to ensure the script is loaded before initializing
    script.onload = () => {
      console.log('Vapi script loaded successfully');
      
      if ((window as any).vapi) {
        console.log('Vapi object found in window, initializing voice bot');
        
        // Small delay to ensure Vapi is fully loaded
        setTimeout(() => {
          try {
            console.log('Calling vapi.initVoicebot with:', {
              assistant_id: DEFAULT_VAPI_CONFIG.assistantId,
              api_key: DEFAULT_VAPI_CONFIG.apiKey.substring(0, 8) + '...'
            });
            
            (window as any).vapi.initVoicebot({
              assistant_id: DEFAULT_VAPI_CONFIG.assistantId,
              api_key: DEFAULT_VAPI_CONFIG.apiKey,
              audio: {
                autoplay: true,
                target_element_id: 'vapi-root',
              },
              input_mode: 'microphone',
              debug: true,
              onStartTalking: () => {
                console.log('Vapi agent started talking');
              },
              onStopTalking: () => {
                console.log('Vapi agent stopped talking');
              },
              onError: (error: any) => {
                console.error('Vapi error:', error);
              }
            });
            
            console.log('Vapi initVoicebot called successfully');
            resolve();
          } catch (initError) {
            console.error('Error initializing Vapi voicebot:', initError);
            reject(initError);
          }
        }, 1000); // Increased delay to ensure Vapi is ready
      } else {
        const error = new Error('Vapi script loaded but vapi object not found in window');
        console.error(error);
        reject(error);
      }
    };
    
    // Handle script loading errors
    script.onerror = (err) => {
      console.error('Error loading Vapi script:', err);
      reject('Failed to load Vapi script');
    };
    
    document.body.appendChild(script);
    console.log('Vapi script added to document body');
  });
}

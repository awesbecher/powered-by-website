
interface VapiConfig {
  apiKey: string;
  assistantId: string;
}

// Updated API key and assistant ID
const DEFAULT_VAPI_CONFIG: VapiConfig = {
  apiKey: 'a212f18f-9d02-4703-914f-ac89661262c5',
  assistantId: 'ebb38ba5-321a-49e4-b860-708bc864327f'
};

// Create a custom event to trigger the voice dialog
export async function initiateVapiCall(): Promise<void> {
  try {
    console.log('Initiating AI voice call with assistant ID:', DEFAULT_VAPI_CONFIG.assistantId);
    
    // First, make sure we have microphone access
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately - we're just checking permissions
      stream.getTracks().forEach(track => track.stop());
      console.log('Microphone permission granted');
    } catch (micError) {
      console.error('Microphone permission denied:', micError);
      return Promise.reject(new Error('Microphone access is required. Please allow microphone access and try again.'));
    }
    
    // Dispatch event for our custom UI
    const event = new CustomEvent('open-voice-dialog');
    document.dispatchEvent(event);
    console.log('Dispatched open-voice-dialog event');
    
    // Clean up any existing Vapi elements first
    cleanupExistingVapiElements();
    
    // Create vapi-root element if it doesn't exist
    ensureVapiRootExists();
    
    // Load the Vapi script
    return await loadVapiScript();
  } catch (error) {
    console.error('Error initiating AI voice call:', error);
    return Promise.reject(error);
  }
}

// Helper function to clean up existing Vapi elements
function cleanupExistingVapiElements(): void {
  console.log('Starting cleanup of existing Vapi elements');
  
  // Clean up global vapi object if it exists
  if ((window as any).vapi) {
    try {
      if (typeof (window as any).vapi.endCall === 'function') {
        (window as any).vapi.endCall();
        console.log('Called vapi.endCall() during cleanup');
      }
      delete (window as any).vapi;
    } catch (e) {
      console.error('Error cleaning up global vapi object:', e);
    }
  }
  
  // Remove any existing Vapi scripts
  const existingScript = document.querySelector('script[src*="vapi.ai"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Clean up vapi-root element
  let vapiRoot = document.getElementById('vapi-root');
  if (vapiRoot) {
    while (vapiRoot.firstChild) {
      vapiRoot.removeChild(vapiRoot.firstChild);
    }
  }
}

// Helper function to ensure vapi-root element exists
function ensureVapiRootExists(): void {
  let vapiRoot = document.getElementById('vapi-root');
  if (!vapiRoot) {
    vapiRoot = document.createElement('div');
    vapiRoot.id = 'vapi-root';
    // Create it with invisible dimensions
    vapiRoot.style.position = 'fixed';
    vapiRoot.style.zIndex = '9999';
    vapiRoot.style.bottom = '0';
    vapiRoot.style.right = '0';
    vapiRoot.style.width = '0';
    vapiRoot.style.height = '0';
    vapiRoot.style.overflow = 'hidden';
    document.body.appendChild(vapiRoot);
  }
}

// Helper function to load Vapi script and initialize voicebot
function loadVapiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('Creating Vapi script element');
    
    const script = document.createElement('script');
    script.src = 'https://cdn.vapi.ai/messenger.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    // We need to ensure the script is loaded before initializing
    script.onload = () => {
      console.log('Vapi script loaded successfully');
      
      // Wait a bit for Vapi to initialize
      setTimeout(() => {
        try {
          if (!(window as any).vapi || !(window as any).vapi.initVoicebot) {
            throw new Error('Vapi object not found after script load');
          }
          
          (window as any).vapi.initVoicebot({
            assistant_id: DEFAULT_VAPI_CONFIG.assistantId,
            api_key: DEFAULT_VAPI_CONFIG.apiKey,
            audio: {
              autoplay: true,
              target_element_id: 'vapi-root',
            },
            input_mode: 'microphone',
            debug: false,
            version: 'v1',
          });
          
          console.log('Vapi initVoicebot called successfully');
          resolve();
        } catch (initError) {
          console.error('Error initializing Vapi voicebot:', initError);
          reject(initError);
        }
      }, 1000);
    };
    
    // Handle script loading errors
    script.onerror = (err) => {
      console.error('Error loading Vapi script:', err);
      reject(new Error('Failed to load Vapi script'));
    };
    
    document.body.appendChild(script);
  });
}

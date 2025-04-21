
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
    console.log('Using API key:', DEFAULT_VAPI_CONFIG.apiKey);
    
    // Dispatch event for our custom UI
    const event = new CustomEvent('open-voice-dialog');
    document.dispatchEvent(event);
    console.log('Dispatched open-voice-dialog event');
    
    // Clean up any existing Vapi elements first
    cleanupExistingVapiElements();
    
    // Create vapi-root element if it doesn't exist
    ensureVapiRootExists();
    
    // Load the Vapi script with retry mechanism
    return await loadVapiScriptWithRetry(3); // Try up to 3 times
  } catch (error) {
    console.error('Error initiating AI voice call:', error);
    return Promise.reject(error);
  }
}

// Helper function to clean up existing Vapi elements
function cleanupExistingVapiElements(): void {
  const existingScript = document.querySelector('script[src*="vapi.ai"]');
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
  
  // Clean up any potential Vapi iframe elements
  const vapiIframes = document.querySelectorAll('iframe[src*="vapi.ai"]');
  vapiIframes.forEach(iframe => {
    iframe.remove();
    console.log('Removed Vapi iframe');
  });
  
  // Clean up global vapi object if it exists
  if ((window as any).vapi) {
    try {
      if (typeof (window as any).vapi.endCall === 'function') {
        (window as any).vapi.endCall();
        console.log('Called vapi.endCall() during cleanup');
      }
      delete (window as any).vapi;
      console.log('Deleted global vapi object');
    } catch (e) {
      console.error('Error cleaning up global vapi object:', e);
    }
  }
}

// Helper function to ensure vapi-root element exists
function ensureVapiRootExists(): void {
  let vapiRoot = document.getElementById('vapi-root');
  if (!vapiRoot) {
    vapiRoot = document.createElement('div');
    vapiRoot.id = 'vapi-root';
    // Create it with visible dimensions for debugging
    vapiRoot.style.position = 'fixed';
    vapiRoot.style.zIndex = '9999';
    vapiRoot.style.bottom = '20px';
    vapiRoot.style.right = '20px';
    vapiRoot.style.width = '0';
    vapiRoot.style.height = '0';
    vapiRoot.style.overflow = 'hidden';
    document.body.appendChild(vapiRoot);
    console.log('Created new Vapi root element with visible position');
  }
}

// Helper function to load Vapi script with retry mechanism
async function loadVapiScriptWithRetry(maxRetries: number): Promise<void> {
  let attempts = 0;
  
  while (attempts < maxRetries) {
    try {
      attempts++;
      console.log(`Attempt ${attempts} to load Vapi script`);
      await loadVapiScript();
      console.log('Vapi script loaded successfully');
      return Promise.resolve();
    } catch (error) {
      console.error(`Attempt ${attempts} failed:`, error);
      
      if (attempts >= maxRetries) {
        console.error(`Failed to load Vapi script after ${maxRetries} attempts`);
        return Promise.reject(error);
      }
      
      // Wait before retrying (with exponential backoff)
      const delay = Math.pow(2, attempts) * 1000;
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return Promise.reject(new Error('Failed to load Vapi script after multiple attempts'));
}

// Helper function to load Vapi script and initialize voicebot
function loadVapiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Set a timeout for the entire operation
    const timeoutId = setTimeout(() => {
      reject(new Error('Vapi script loading timed out after 15 seconds'));
    }, 15000);
    
    const script = document.createElement('script');
    script.src = 'https://cdn.vapi.ai/messenger.js';
    script.async = true;
    script.crossOrigin = 'anonymous'; // Add crossOrigin attribute
    
    // We need to ensure the script is loaded before initializing
    script.onload = () => {
      console.log('Vapi script loaded successfully');
      
      // Clear the timeout as script has loaded
      clearTimeout(timeoutId);
      
      if ((window as any).vapi) {
        console.log('Vapi object found in window, initializing voice bot');
        
        // Small delay to ensure Vapi is fully loaded
        setTimeout(() => {
          try {
            console.log('Calling vapi.initVoicebot with:', {
              assistant_id: DEFAULT_VAPI_CONFIG.assistantId,
              api_key: DEFAULT_VAPI_CONFIG.apiKey
            });
            
            // Try to get user media before initializing to ensure permissions
            navigator.mediaDevices.getUserMedia({ audio: true })
              .then(() => {
                console.log('Microphone permission granted, initializing Vapi');
                
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
                  },
                  // Add additional callbacks for better debugging
                  onConversationStarted: () => {
                    console.log('Vapi conversation started');
                  },
                  onConversationEnded: () => {
                    console.log('Vapi conversation ended');
                  }
                });
                
                console.log('Vapi initVoicebot called successfully');
                resolve();
              })
              .catch((err) => {
                console.error('Error getting microphone permission:', err);
                reject(err);
              });
          } catch (initError) {
            console.error('Error initializing Vapi voicebot:', initError);
            reject(initError);
          }
        }, 1500); // Increased delay to ensure Vapi is ready
      } else {
        const error = new Error('Vapi script loaded but vapi object not found in window');
        console.error(error);
        reject(error);
      }
    };
    
    // Handle script loading errors
    script.onerror = (err) => {
      clearTimeout(timeoutId);
      console.error('Error loading Vapi script:', err);
      reject('Failed to load Vapi script');
    };
    
    document.body.appendChild(script);
    console.log('Vapi script added to document body');
  });
}

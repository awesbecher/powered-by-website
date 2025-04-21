
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
    
    // Open Vapi in the current window (not a new window)
    const vapiUrl = new URL('https://api.vapi.ai/call');
    vapiUrl.searchParams.append('assistant_id', DEFAULT_VAPI_CONFIG.assistantId);
    vapiUrl.searchParams.append('api_key', DEFAULT_VAPI_CONFIG.apiKey);
    
    // Dispatch event for our custom UI
    const event = new CustomEvent('open-voice-dialog');
    document.dispatchEvent(event);
    
    // Connect to Vapi service directly with a full window redirect
    // This will open in a new tab since iframe approach wasn't working
    window.open(vapiUrl.toString(), '_blank');
    
    console.log('Voice dialog event triggered and Vapi service launched');
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error initiating AI voice call:', error);
    return Promise.reject(error);
  }
}

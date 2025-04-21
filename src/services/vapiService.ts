
import { useToast } from "@/hooks/use-toast";

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
    
    // Instead of opening Vapi in a new window, we'll dispatch an event to open our own dialog
    const event = new CustomEvent('open-voice-dialog');
    document.dispatchEvent(event);
    
    console.log('Voice dialog event triggered');
    return Promise.resolve();
  } catch (error) {
    console.error('Error initiating AI voice call:', error);
    return Promise.reject(error);
  }
}

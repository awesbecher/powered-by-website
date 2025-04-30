import Vapi from '@vapi-ai/web';

// Vapi configuration
const API_KEY = 'a212f18f-9d02-4703-914f-ac89661262c5';

// Assistant IDs for different services
const ASSISTANT_IDS = {
  realEstate: 'c1c80d2e-6b65-4172-9f6b-09177b9e54f1',
  mercedes: 'c1c80d2e-6b65-4172-9f6b-09177b9e54f1', // Using real estate ID temporarily
  roomService: '238616a3-b611-4faa-a216-74b8d7d8b277',
  retail: 'defa6102-2358-4347-a192-24c6bc23ea4c',
  general: 'ebb38ba5-321a-49e4-b860-708bc864327f'
};

let vapiInstance: Vapi | null = null;
let mediaStream: MediaStream | null = null;
let isCallActive = false;

export async function initiateVapiCall(service: keyof typeof ASSISTANT_IDS = 'general'): Promise<void> {
  try {
    // Clean up any existing instances
    if (vapiInstance) {
      await cleanupVapiCall();
    }

    // Get microphone permissions first
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted');
    } catch (error) {
      console.error('Microphone access error:', error);
      throw new Error(`Microphone access error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    // Initialize Vapi with service-specific assistant
    try {
      console.log('Starting Vapi initialization...');
      
      // Create Vapi instance with API key and audio stream
      vapiInstance = new Vapi(API_KEY);

      // Set up error handling
      vapiInstance.on('error', (error: any) => {
        console.error('Vapi error event:', error);
      });

      // Wait for audio stream to be ready
      if (mediaStream) {
        // @ts-ignore - Property exists but type is not defined
        vapiInstance.audioStream = mediaStream;
      }

      // Start call with assistant ID
      console.log('Starting call with assistant:', ASSISTANT_IDS[service]);
      const call = await vapiInstance.start(ASSISTANT_IDS[service]);

      console.log('Vapi call started successfully:', call);
      isCallActive = true;
    } catch (error) {
      console.error('Vapi initialization details:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        assistantId: ASSISTANT_IDS[service]
      });
      
      // Clean up media stream if Vapi initialization fails
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
      }
      throw new Error(`Vapi initialization error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } catch (error) {
    // Clean up everything if any error occurs
    await cleanupVapiCall();
    throw error;
  }
}

// Clean up resources without page refresh
async function cleanupVapiCall(): Promise<void> {
  // Stop media stream
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }

  // Stop Vapi instance
  if (vapiInstance) {
    try {
      await vapiInstance.stop();
    } catch (error) {
      console.error('Error stopping Vapi:', error);
    }
    vapiInstance = null;
  }

  isCallActive = false;
}

// Only refresh the page when explicitly ending the call
export async function endVapiCall(): Promise<void> {
  await cleanupVapiCall();
  window.location.reload();
}

export function getVapiCallStatus(): boolean {
  return isCallActive;
}

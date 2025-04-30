import Vapi from '@vapi-ai/web';

// Vapi configuration
const API_KEY = 'vapi_live_6c02f892-3082-4c68-a3ee-92ca86444331';

// Assistant ID for room service
const ASSISTANT_ID = '238616a3-b611-4faa-a216-74b8d7d8b277';

let vapiInstance: Vapi | null = null;
let mediaStream: MediaStream | null = null;
let isCallActive = false;
let audioContext: AudioContext | null = null;

// Play a test tone to verify audio output
async function playTestTone() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  gainNode.gain.value = 0.1; // Quiet volume
  oscillator.frequency.value = 440; // A4 note
  
  oscillator.start();
  await new Promise(resolve => setTimeout(resolve, 200));
  oscillator.stop();
}

export async function startRoomServiceCall(): Promise<void> {
  try {
    // Clean up any existing instances
    if (vapiInstance) {
      await stopRoomServiceCall();
    }

    // Initialize audio context first
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    // Get microphone permissions first
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      console.log('Microphone access granted');

      // Log audio tracks
      mediaStream.getAudioTracks().forEach(track => {
        console.log('Audio track:', {
          enabled: track.enabled,
          muted: track.muted,
          readyState: track.readyState,
          label: track.label,
          constraints: track.getConstraints()
        });
      });

      // Play test tone
      await playTestTone();
    } catch (error) {
      console.error('Microphone access error:', error);
      throw new Error(`Microphone access error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    // Initialize Vapi with service-specific assistant
    try {
      console.log('Starting Vapi initialization...');
      
      // Create Vapi instance with API key and audio stream
      vapiInstance = new Vapi(API_KEY);

      // Set up error listener
      vapiInstance.on('error', (error: any) => {
        console.error('Vapi error event:', error);
      });

      // Set up debug listeners
      vapiInstance.on('error', () => {
        console.log('Vapi error');
      });

      vapiInstance.on('ready', () => {
        console.log('Vapi ready');
      });

      vapiInstance.on('connecting', () => {
        console.log('Vapi connecting');
      });

      vapiInstance.on('connected', () => {
        console.log('Vapi connected');
      });

      // Wait for audio stream to be ready
      if (mediaStream && audioContext) {
        // Create audio nodes
        const source = audioContext.createMediaStreamSource(mediaStream);
        const destination = audioContext.createMediaStreamDestination();
        const gainNode = audioContext.createGain();
        
        // Set up gain
        gainNode.gain.value = 1.5; // Boost input slightly
        
        // Connect nodes
        source.connect(gainNode);
        gainNode.connect(destination);
        
        // Set up audio stream with Vapi
        // @ts-ignore - Property exists but type is not defined
        vapiInstance.audioContext = audioContext;
        // @ts-ignore - Property exists but type is not defined
        vapiInstance.audioInput = source;
        // @ts-ignore - Property exists but type is not defined
        vapiInstance.audioOutput = destination;
        // @ts-ignore - Property exists but type is not defined
        vapiInstance.audioStream = destination.stream;
      }

      // Start call with assistant ID
      console.log('Starting room service call with assistant:', ASSISTANT_ID);
      const call = await vapiInstance.start(ASSISTANT_ID);

      console.log('Room service call started successfully:', call);
      isCallActive = true;

      // Play test tone after call starts
      await playTestTone();
    } catch (error) {
      console.error('Room service call error:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Clean up media stream if Vapi initialization fails
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
      }
      throw new Error(`Room service call error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } catch (error) {
    // Clean up everything if any error occurs
    await stopRoomServiceCall();
    throw error;
  }
}

export async function stopRoomServiceCall(): Promise<void> {
  // Stop media stream
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }

  // Stop audio context
  if (audioContext) {
    await audioContext.close();
    audioContext = null;
  }

  // Stop Vapi instance
  if (vapiInstance) {
    try {
      // Remove all event listeners
      vapiInstance.removeAllListeners();
      await vapiInstance.stop();
    } catch (error) {
      console.error('Error stopping room service call:', error);
    }
    vapiInstance = null;
  }

  isCallActive = false;
}

export function getRoomServiceCallStatus(): boolean {
  return isCallActive;
}

import Vapi from '@vapi-ai/web';

// Vapi configuration
const API_KEY = 'a212f18f-9d02-4703-914f-ac89661262c5';
const MAX_RECONNECT_ATTEMPTS = 3;
const RECONNECT_DELAY_MS = 2000;

// Assistant IDs for different services
const ASSISTANT_IDS = {
  realEstate: 'c1c80d2e-6b65-4172-9f6b-09177b9e54f1',
  auto: 'df42b616-337e-4877-8e9b-44fb0b5a0225',
  roomService: '238616a3-b611-4faa-a216-74b8d7d8b277',
  retail: 'defa6102-2358-4347-a192-24c6bc23ea4c',
  general: 'ebb38ba5-321a-49e4-b860-708bc864327f',
  insurance: 'df42b616-337e-4877-8e9b-44fb0b5a0225'
};

interface CallState {
  isActive: boolean;
  hasAudioOutput: boolean;
  lastSpeechTime: number;
  reconnectAttempts: number;
  errors: Array<{
    time: number;
    type: string;
    message: string;
  }>;
}

let vapiInstance: Vapi | null = null;
let mediaStream: MediaStream | null = null;
let audioContext: AudioContext | null = null;
let callState: CallState = {
  isActive: false,
  hasAudioOutput: false,
  lastSpeechTime: 0,
  reconnectAttempts: 0,
  errors: []
};

function logTelemetry(event: string, data: any = {}) {
  const telemetry = {
    timestamp: new Date().toISOString(),
    event,
    callState: { ...callState },
    ...data
  };
  console.log('[Telemetry]', telemetry);
}

function logError(type: string, message: string, error?: any) {
  const errorEntry = {
    time: Date.now(),
    type,
    message
  };
  callState.errors.push(errorEntry);
  console.error(`[Error] ${type}: ${message}`, error);
}

async function playTestTone() {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.value = 0.1;
  oscillator.frequency.value = 440;

  oscillator.start();
  await new Promise(resolve => setTimeout(resolve, 200));
  oscillator.stop();
}

async function setupEventListeners(vapi: Vapi) {
  vapi.on('call-start', () => {
    logTelemetry('call_started');
    callState.isActive = true;
    callState.lastSpeechTime = Date.now();
  });

  vapi.on('call-end', () => {
    logTelemetry('call_ended');
    callState.isActive = false;
  });

  vapi.on('error', (error: any) => {
    handleError(error);
  });

  vapi.on('speech-start', () => {
    logTelemetry('speech_start');
    callState.hasAudioOutput = true;
    callState.lastSpeechTime = Date.now();
  });

  vapi.on('speech-end', () => {
    logTelemetry('speech_end');
  });
}

function handleError(error: any) {
  logError('vapi_error', error?.message || 'Unknown error', error);

  // Dispatch error event
  const errorEvent = new CustomEvent('vapi-error', { 
    detail: { error, callState: { ...callState } }
  });
  document.dispatchEvent(errorEvent);

  // Handle reconnection if appropriate
  if (callState.isActive && callState.reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    callState.reconnectAttempts++;
    setTimeout(() => {
      initiateVapiCall();
    }, RECONNECT_DELAY_MS);
  }
}

async function setupVapiInstance(): Promise<Vapi> {
  try {
    const vapi = new Vapi(API_KEY);
    await setupEventListeners(vapi);
    return vapi;
  } catch (error) {
    logError('setup_failed', 'Failed to setup Vapi instance', error);
    throw error;
  }
}

async function setupMediaStream(): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 48000,
        channelCount: 1
      }
    });
    
    logTelemetry('media_stream_setup', {
      tracks: stream.getTracks().map(track => ({
        kind: track.kind,
        enabled: track.enabled,
        muted: track.muted,
        readyState: track.readyState,
        constraints: track.getConstraints()
      }))
    });
    return stream;
  } catch (error) {
    logError('media_stream_failed', 'Failed to get media stream', error);
    throw error;
  }
}

export async function initiateVapiCall(assistantId?: string): Promise<void> {
  let audioCheckInterval: number | null = null;

  try {
    // Clean up any existing call
    if (vapiInstance) {
      await cleanupVapiCall();
    }

    // Initialize audio context first
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: 48000,
      latencyHint: 'interactive'
    });
    await audioContext.resume();
    logTelemetry('audio_context_setup', { state: audioContext.state });

    // Get media stream
    mediaStream = await setupMediaStream();
    if (!mediaStream) {
      throw new Error('Failed to get media stream');
    }

    // Create audio nodes
    const source = audioContext.createMediaStreamSource(mediaStream);
    
    // Create Vapi instance
    vapiInstance = await setupVapiInstance();
    if (!vapiInstance) {
      throw new Error('Failed to create Vapi instance');
    }

    // Start the call
    logTelemetry('call_init', { 
      assistantId: assistantId || ASSISTANT_IDS.general
    });

    // Set up audio monitoring
    audioCheckInterval = window.setInterval(() => {
      const now = Date.now();
      const timeSinceLastSpeech = now - callState.lastSpeechTime;

      if (callState.isActive && !callState.hasAudioOutput && timeSinceLastSpeech > 10000) {
        logError('no_audio_output', 'No audio output detected for 10 seconds');
        handleError(new Error('No audio output'));
        if (audioCheckInterval) {
          window.clearInterval(audioCheckInterval);
        }
      }
    }, 10000);

    // Start the call with the audio stream
    await vapiInstance.start(assistantId || ASSISTANT_IDS.general);

    // Add cleanup handler
    vapiInstance.on('call-end', () => {
      if (audioCheckInterval) {
        window.clearInterval(audioCheckInterval);
      }
      if (audioContext) {
        audioContext.close();
      }
    });

  } catch (error) {
    logError('call_init_failed', 'Failed to initiate call', error);

    // Clean up resources
    if (audioCheckInterval) {
      window.clearInterval(audioCheckInterval);
    }
    if (audioContext) {
      await audioContext.close();
    }
    await cleanupVapiCall();
    throw error;
  }
}

async function cleanupVapiCall(): Promise<void> {
  logTelemetry('cleanup_start');

  if (mediaStream) {
    mediaStream.getTracks().forEach(track => {
      track.stop();
      logTelemetry('track_stopped', { kind: track.kind });
    });
    mediaStream = null;
  }

  if (vapiInstance) {
    try {
      await vapiInstance.stop();
      logTelemetry('vapi_stopped');
    } catch (error) {
      logError('stop_failed', 'Error stopping Vapi', error);
    }
    vapiInstance = null;
  }

  callState = {
    isActive: false,
    hasAudioOutput: false,
    lastSpeechTime: 0,
    reconnectAttempts: 0,
    errors: []
  };

  logTelemetry('cleanup_complete');
}

export async function endVapiCall(): Promise<void> {
  await cleanupVapiCall();
}

export function getVapiCallStatus(): boolean {
  return callState.isActive;
}

export function getCallState(): CallState {
  return { ...callState };
}

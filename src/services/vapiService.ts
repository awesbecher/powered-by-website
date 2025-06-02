import Vapi from '@vapi-ai/web';

// Vapi configuration
const API_KEY = import.meta.env.VITE_VAPI_API_KEY || 'a212f18f-9d02-4703-914f-ac89661262c5'; // Fallback for development
const MAX_RECONNECT_ATTEMPTS = 3;
const RECONNECT_DELAY_MS = 2000;

// Assistant IDs for different services
const ASSISTANT_IDS = {
  realEstate: import.meta.env.VITE_ASSISTANT_ID_REAL_ESTATE || 'c1c80d2e-6b65-4172-9f6b-09177b9e54f1',
  mercedes: import.meta.env.VITE_ASSISTANT_ID_MERCEDES || 'df42b616-337e-4877-8e9b-44fb0b5a0225',
  roomService: import.meta.env.VITE_ASSISTANT_ID_ROOM_SERVICE || '238616a3-b611-4faa-a216-74b8d7d8b277',
  retail: import.meta.env.VITE_ASSISTANT_ID_RETAIL || 'defa6102-2358-4347-a192-24c6bc23ea4c',
  insurance: import.meta.env.VITE_ASSISTANT_ID_INSURANCE || 'df42b616-337e-4877-8e9b-44fb0b5a0225',
  general: import.meta.env.VITE_ASSISTANT_ID_GENERAL || 'ebb38ba5-321a-49e4-b860-708bc864327f'
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
  const errorInfo = {
    time: Date.now(),
    type,
    message
  };
  callState.errors.push(errorInfo);
  console.error(`[${type}]`, message, error);
  logTelemetry('error', { error: errorInfo });
}

// Play a test tone to verify audio output
async function playTestTone() {
  if (!audioContext) {
    return;
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
  
  logTelemetry('test_tone_played');
}

async function setupEventListeners(vapi: Vapi) {
  vapi.on('error', (error: any) => {
    logError('vapi_error', 'Vapi error event', error);
    handleError(error);
  });

  vapi.on('call-start', () => {
    logTelemetry('call_start', {
      timestamp: Date.now(),
      audioContextState: audioContext?.state,
      hasMediaStream: !!mediaStream,
      mediaStreamActive: mediaStream?.active
    });
    callState.isActive = true;
    callState.reconnectAttempts = 0;
  });

  vapi.on('call-end', () => {
    logTelemetry('call_end', {
      timestamp: Date.now(),
      hadAudioOutput: callState.hasAudioOutput
    });
    callState.isActive = false;
  });

  vapi.on('speech-start', () => {
    logTelemetry('speech_start', {
      timestamp: Date.now(),
      audioContextState: audioContext?.state,
      mediaStreamActive: mediaStream?.active,
      tracks: mediaStream?.getTracks().map(track => ({
        kind: track.kind,
        enabled: track.enabled,
        muted: track.muted,
        readyState: track.readyState
      }))
    });
    callState.hasAudioOutput = true;
    callState.lastSpeechTime = Date.now();
  });

  vapi.on('speech-end', () => {
    logTelemetry('speech_end', {
      timestamp: Date.now(),
      speechDuration: Date.now() - callState.lastSpeechTime
    });
  });

  vapi.on('volume-level', (volume: number) => {
    if (volume > 0) {
      callState.hasAudioOutput = true;
      logTelemetry('volume_level', { 
        timestamp: Date.now(),
        volume,
        hasAudioOutput: callState.hasAudioOutput
      });
    }
  });

  vapi.on('message', (message: any) => {
    logTelemetry('message', { 
      timestamp: Date.now(),
      message,
      type: typeof message,
      hasContent: !!message
    });
  });
}

async function handleError(error: any) {
  if (callState.reconnectAttempts < MAX_RECONNECT_ATTEMPTS && callState.isActive) {
    callState.reconnectAttempts++;
    logTelemetry('reconnect_attempt', { attempt: callState.reconnectAttempts });

    try {
      await new Promise(resolve => setTimeout(resolve, RECONNECT_DELAY_MS));
      
      if (vapiInstance) {
        await vapiInstance.stop();
        await setupVapiInstance();
        logTelemetry('reconnect_success');
      }
    } catch (reconnectError) {
      logError('reconnect_failed', 'Failed to reconnect', reconnectError);
      await cleanupVapiCall();
    }
  } else {
    logError('max_reconnects_exceeded', 'Maximum reconnection attempts exceeded');
    await cleanupVapiCall();
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

export async function initiateVapiCall(service: keyof typeof ASSISTANT_IDS = 'general'): Promise<void> {
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

    // Play test tone to verify audio output
    await playTestTone();

    // Get media stream
    mediaStream = await setupMediaStream();
    if (!mediaStream) {
      throw new Error('Failed to get media stream');
    }

    // Create audio nodes
    const source = audioContext.createMediaStreamSource(mediaStream);
    const destination = audioContext.createMediaStreamDestination();
    const gainNode = audioContext.createGain();
    
    // Set up gain
    gainNode.gain.value = 1.5; // Boost input slightly
    
    // Do NOT connect source to destination to avoid hearing your own voice
    // This is what was causing the audio feedback
    
    // Create audio element for monitoring but don't feed back the microphone
    const audioElement = new Audio();
    audioElement.autoplay = true;

    // Create Vapi instance
    vapiInstance = await setupVapiInstance();
    if (!vapiInstance) {
      throw new Error('Failed to create Vapi instance');
    }

    // Set up Vapi with source and destination streams
    // @ts-ignore - Properties exist but types are not defined
    vapiInstance.audioContext = audioContext;
    // @ts-ignore - Properties exist but types are not defined
    vapiInstance.audioInput = source;
    // @ts-ignore - Properties exist but types are not defined
    vapiInstance.audioOutput = audioContext.destination;
    // @ts-ignore - Properties exist but types are not defined
    vapiInstance.audioStream = mediaStream;

    // Set up audio element event handlers
    audioElement.onplay = () => {
      logTelemetry('vapi_audio_play');
    };

    audioElement.onended = () => {
      logTelemetry('vapi_audio_ended');
    };

    audioElement.onerror = (error) => {
      logError('vapi_audio_error', 'Audio element error', error);
    };

    // Log audio track details
    mediaStream.getAudioTracks().forEach(track => {
      logTelemetry('vapi_track_added', {
        kind: track.kind,
        enabled: track.enabled,
        muted: track.muted,
        readyState: track.readyState,
        constraints: track.getConstraints()
      });
    });

    // Enhanced logging for audio setup
    logTelemetry('audio_setup', {
      contextState: audioContext.state,
      sampleRate: audioContext.sampleRate,
      baseLatency: audioContext.baseLatency,
      outputLatency: audioContext.outputLatency,
      microphoneActive: mediaStream.active,
      microphoneTracks: mediaStream.getAudioTracks().length
    });

    // Start the call
    logTelemetry('call_init', { 
      service, 
      assistantId: ASSISTANT_IDS[service]
    });

    await vapiInstance.start(ASSISTANT_IDS[service]);

    // Play test tone after call starts
    await playTestTone();

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
  window.location.reload();
}

export function getVapiCallStatus(): boolean {
  return callState.isActive;
}

export function getCallState(): CallState {
  return { ...callState };
}

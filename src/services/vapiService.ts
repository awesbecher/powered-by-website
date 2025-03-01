
import Vapi from "@vapi-ai/web";

let vapiInstance: Vapi | null = null;

const checkBrowserCompatibility = () => {
  // Check if running in a secure context (HTTPS or localhost)
  if (!window.isSecureContext) {
    throw new Error("Voice chat requires a secure connection (HTTPS). Please ensure you're accessing the site via HTTPS.");
  }

  // Check for general WebRTC support
  const hasWebRTC = !!(
    window.RTCPeerConnection ||
    (window as any).webkitRTCPeerConnection ||
    (window as any).mozRTCPeerConnection
  );

  // Check for MediaDevices API support
  const hasMediaDevices = !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia
  );

  // Check for audio context support
  const hasAudioContext = !!(
    window.AudioContext ||
    (window as any).webkitAudioContext
  );

  if (!hasWebRTC || !hasMediaDevices || !hasAudioContext) {
    throw new Error(
      "Your browser doesn't fully support voice chat features. For the best experience, please use Chrome, Firefox, Safari, or Edge. If you're using Safari or another browser, make sure it's updated to the latest version and that microphone permissions are enabled."
    );
  }
};

export const getVapiInstance = () => {
  if (!vapiInstance) {
    vapiInstance = new Vapi("YOUR_VAPI_API_KEY"); // Replace with the actual API key when provided
    
    vapiInstance.on("call-start", () => {
      console.log("Call has started");
    });

    vapiInstance.on("call-end", () => {
      console.log("Call has ended");
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
    });
  }
  return vapiInstance;
};

export const initiateVapiCall = async (assistantId: string) => {
  try {
    checkBrowserCompatibility();
    
    try {
      await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
          channelCount: 1
        } 
      });
    } catch (mediaError) {
      console.error('MediaDevices error:', mediaError);
      await navigator.mediaDevices.getUserMedia({ audio: true });
    }
    
    const vapi = getVapiInstance();
    await vapi.start(assistantId);
    
    return true;
  } catch (error) {
    console.error('Error in initiateVapiCall:', error);
    if (error instanceof Error) {
      let errorMessage = error.message;
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Microphone access was denied. Please enable microphone permissions in your browser settings.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No microphone found. Please ensure your microphone is properly connected.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Your browser version may be too old. Please update your browser or try Chrome/Firefox.';
      } else if (error.name === 'SecurityError') {
        errorMessage = 'Security error. Please ensure you are using HTTPS and have granted the necessary permissions.';
      }
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const stopVapiCall = () => {
  try {
    const vapi = getVapiInstance();
    vapi.stop();
  } catch (error) {
    console.error('Error stopping Vapi call:', error);
    throw error;
  }
};

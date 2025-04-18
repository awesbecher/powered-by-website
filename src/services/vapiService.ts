
import Vapi from "@vapi-ai/web";

let vapiInstance: Vapi | null = null;
let activeCallId: string | null = null;

/**
 * Check browser compatibility for voice chat features
 */
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

/**
 * Lazy-initializes and returns the Vapi instance
 */
export const getVapiInstance = () => {
  if (!vapiInstance) {
    console.log("Creating new Vapi instance");
    try {
      // Initialize with the public API key
      vapiInstance = new Vapi("a212f18f-9d02-4703-914f-ac89661262c5");
      
      // Setup default event listeners
      // Fix: Use correct function signatures for event handlers
      vapiInstance.on("call-start", () => {
        console.log("Call has started");
        // We can still access event data internally if needed later
        activeCallId = vapiInstance?.getCallId() || null;
      });

      vapiInstance.on("call-end", () => {
        console.log("Call has ended");
        activeCallId = null;
      });

      vapiInstance.on("error", (error) => {
        console.error("Vapi error:", error);
      });
      
      console.log("Vapi instance created successfully");
    } catch (error) {
      console.error("Error creating Vapi instance:", error);
      throw new Error("Failed to initialize voice chat service. Please try again later.");
    }
  }
  return vapiInstance;
};

/**
 * Initiates a voice call with the specified assistant
 */
export const initiateVapiCall = async (assistantId: string) => {
  try {
    console.log("Initiating Vapi call with assistant:", assistantId);
    checkBrowserCompatibility();
    
    // Request microphone access with enhanced error handling
    try {
      // First try with enhanced audio options
      await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
          channelCount: 1
        } 
      });
      console.log("Audio access granted with enhanced options");
    } catch (mediaError) {
      console.error('MediaDevices error with enhanced options:', mediaError);
      // Fallback to basic audio request
      console.log("Falling back to basic audio request");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Audio access granted with basic options");
    }
    
    const vapi = getVapiInstance();
    if (!vapi) {
      throw new Error("Failed to initialize voice service");
    }
    
    console.log("Starting Vapi call with assistant ID:", assistantId);
    await vapi.start(assistantId);
    console.log("Vapi call successfully initiated");
    
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
      } else if (error.name === 'AbortError') {
        errorMessage = 'The audio capture was aborted. Please try again.';
      }
      throw new Error(errorMessage);
    }
    throw error;
  }
};

/**
 * Stops the current voice call
 */
export const stopVapiCall = () => {
  try {
    console.log("Stopping Vapi call");
    const vapi = getVapiInstance();
    if (!vapi) {
      console.warn("No active Vapi instance to stop");
      return;
    }
    vapi.stop();
    activeCallId = null;
    console.log("Vapi call stopped successfully");
  } catch (error) {
    console.error('Error stopping Vapi call:', error);
    throw error;
  }
};

/**
 * Returns whether a call is currently active
 */
export const isVapiCallActive = () => {
  return activeCallId !== null;
};

/**
 * Resets the Vapi instance (useful for testing or recovery from errors)
 */
export const resetVapiInstance = () => {
  try {
    if (vapiInstance) {
      if (activeCallId) {
        vapiInstance.stop();
      }
      vapiInstance = null;
      activeCallId = null;
    }
  } catch (error) {
    console.error("Error resetting Vapi instance:", error);
  }
};

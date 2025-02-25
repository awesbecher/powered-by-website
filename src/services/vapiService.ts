
import Vapi from "@vapi-ai/web";

let vapiInstance: Vapi | null = null;

const checkBrowserCompatibility = () => {
  // Check if browser supports required APIs
  const hasGetUserMedia = !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia
  );
  
  if (!hasGetUserMedia) {
    throw new Error("Your browser does not support voice chat. Please use Chrome, Firefox, or a modern browser that supports WebRTC.");
  }
};

export const getVapiInstance = () => {
  if (!vapiInstance) {
    vapiInstance = new Vapi("a212f18f-9d02-4703-914f-ac89661262c5");
    
    // Set up event listeners
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

export const initiateVapiCall = async () => {
  try {
    // Check browser compatibility before starting
    checkBrowserCompatibility();
    
    // Request microphone permission explicitly first
    await navigator.mediaDevices.getUserMedia({ audio: true });
    
    const vapi = getVapiInstance();
    
    // Start call with the correct persistent assistant ID
    await vapi.start("c7acc482-bee2-40a3-85d1-a192ce2a6685");
    
    return true;
  } catch (error) {
    console.error('Error in initiateVapiCall:', error);
    if (error instanceof Error) {
      // Rethrow with more specific message for users
      throw new Error(error.message || 'Failed to start voice chat. Please ensure your microphone is enabled and you are using a supported browser.');
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

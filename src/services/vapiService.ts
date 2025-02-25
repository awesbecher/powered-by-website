
import Vapi from "@vapi-ai/web";

let vapiInstance: Vapi | null = null;

export const getVapiInstance = () => {
  if (!vapiInstance) {
    vapiInstance = new Vapi("vapi_60b1f3cd6c0a4903a0a3239ddbcc8d18");
    
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
    const vapi = getVapiInstance();
    
    // Start call with persistent assistant ID
    await vapi.start("65f04f3b164a4efcae0e8533");
    
    return true;
  } catch (error) {
    console.error('Error in initiateVapiCall:', error);
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

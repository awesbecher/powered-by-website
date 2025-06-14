
export interface DialogContent {
  title: string;
  description: string;
  buttonText: string;
  consent: string;
}

export const getDialogContent = (source: 'voice-chat' | 'voice-business' | 'home' = 'home'): DialogContent => {
  if (source === 'voice-chat') {
    return {
      title: "Start Voice Chat with Michael @ Powered_By",
      description: "You'll be able to have a voice conversation with Michael (our AI voice agent) directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.",
      buttonText: "Start Voice Chat Now",
      consent: "By clicking \"Start Voice Chat\", you consent to having a voice conversation with Powered_by's AI agent. You can end the conversation at any time."
    };
  } else if (source === 'voice-business') {
    return {
      title: "Start Voice Chat with Michael @ Powered_By",
      description: "You'll be able to have a voice conversation with Michael (our AI voice agent) directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.",
      buttonText: "Start AI Receptionist Demo",
      consent: "By clicking \"Start AI Receptionist Demo\", you consent to having a voice conversation with Powered_by's AI agent. You can end the conversation at any time."
    };
  } else {
    // Default (home page)
    return {
      title: "Start Voice Chat with Michael @ Powered_By",
      description: "You'll be able to have a voice conversation with Michael (our AI voice agent) directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.",
      buttonText: "Start Voice Chat Now",
      consent: "By clicking \"Start Voice Chat\", you consent to having a voice conversation with Powered_by's AI agent. You can end the conversation at any time."
    };
  }
};

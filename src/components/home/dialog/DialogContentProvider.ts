
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
      buttonText: "Start Voice Chat",
      consent: "By clicking \"Start Voice Chat\", you consent to having a voice conversation with RightBloom's sales team. You can end the conversation at any time."
    };
  } else if (source === 'voice-business') {
    return {
      title: "Good choice!",
      description: "You're one step closer to implementing AI Receptionist for your business lines.",
      buttonText: "Start AI Receptionist Demo",
      consent: "By clicking \"Start AI Receptionist Demo\", you consent to having a voice conversation with Powered_by's Solutions Team. You can end the conversation at any time."
    };
  } else {
    // Default (home page)
    return {
      title: "Good choice!",
      description: "You're one step closer to implementing AI for your business.",
      buttonText: "Start AI Demo",
      consent: "By clicking \"Start AI Demo\", you consent to having a voice conversation with Powered_by's Solutions Team. You can end the conversation at any time."
    };
  }
};

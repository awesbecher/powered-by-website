
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useAgentVoice(selectedLanguage = "en-US") {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  // Convert response text to speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      
      // Improved voice selection if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang === utterance.lang && (voice.name.includes("Google") || voice.name.includes("Natural"))
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start voice input (speech-to-text)
  const startVoiceInput = (onTranscription: (text: string) => void) => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser. Try Chrome.",
      });
      return;
    }
    
    setIsListening(true);
    
    // @ts-ignore - webkitSpeechRecognition is not in the TypeScript types
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      onTranscription(speechText);
    };

    recognition.onerror = (err: any) => {
      console.error("Speech recognition error", err);
      toast({
        variant: "destructive",
        title: "Voice Error",
        description: `Error: ${err.error}. Please try again.`,
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return {
    isListening,
    speakText,
    startVoiceInput
  };
}

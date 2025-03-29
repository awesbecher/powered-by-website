
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface VoiceAgentInterfaceProps {
  // Props would be expanded as we integrate with external services
}

const VoiceAgentInterface: React.FC<VoiceAgentInterfaceProps> = () => {
  // States for managing the voice agent
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Function to toggle listening state
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  // Function to start listening
  const startListening = () => {
    setIsListening(true);
    setError(null);
    
    // In a real implementation, this would initialize microphone recording
    toast({
      title: "Listening",
      description: "Speak now. I'm listening to your question.",
    });
    
    // This is a placeholder for actual microphone recording logic
    // In the future, this would connect to the browser's audio API
    
    // Simulate recording for 5 seconds then process
    setTimeout(() => {
      stopListening();
    }, 5000);
  };
  
  // Function to stop listening and process audio
  const stopListening = () => {
    setIsListening(false);
    setIsProcessing(true);
    
    // In a real implementation, this would:
    // 1. Send audio to Whisper for STT
    // 2. Process text through Pinecone/Make.com
    // 3. Generate response with GPT
    // 4. Convert response to speech with Cartesia.ai
    
    // For now, we'll simulate with timeouts
    setTimeout(() => {
      // Simulate transcription result
      setTranscript("This is a simulated transcript of what you might have said.");
      
      // Simulate processing delay
      setTimeout(() => {
        // Simulate AI response
        setResponse("This is a simulated response from the AI voice agent based on your question and our knowledge base.");
        setIsProcessing(false);
        simulateSpeaking();
      }, 1500);
    }, 1000);
  };
  
  // Function to simulate the TTS speaking
  const simulateSpeaking = () => {
    setIsSpeaking(true);
    
    // In a real implementation, this would play the audio from Cartesia.ai
    // For now, we'll just simulate the speaking state
    
    // Simulate speech duration
    setTimeout(() => {
      setIsSpeaking(false);
    }, 4000);
  };
  
  // Function to handle errors
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsListening(false);
    setIsProcessing(false);
    setIsSpeaking(false);
    
    toast({
      variant: "destructive",
      title: "Error",
      description: "We are experiencing a technical fault with this service. Please attempt your conversation again.",
    });
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl border border-purple-500/30">
      {/* Status Indicator */}
      <div className="flex items-center justify-center mb-6">
        <div className="px-4 py-2 rounded-full bg-gray-700 text-white flex items-center">
          <span className="mr-2">Status:</span>
          {isListening && (
            <span className="text-green-400 flex items-center">
              Listening <span className="ml-2 h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
            </span>
          )}
          {isProcessing && (
            <span className="text-yellow-400 flex items-center">
              Processing <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </span>
          )}
          {isSpeaking && (
            <span className="text-blue-400 flex items-center">
              Speaking <Volume2 className="ml-2 h-4 w-4 animate-pulse" />
            </span>
          )}
          {!isListening && !isProcessing && !isSpeaking && (
            <span className="text-gray-400">Ready</span>
          )}
        </div>
      </div>
      
      {/* Main Interaction Area */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Voice Recording Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <Button
            onClick={toggleListening}
            disabled={isProcessing || isSpeaking}
            className={`w-20 h-20 rounded-full ${
              isListening
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-[#9b87f5] hover:bg-[#8a75e3]'
            } flex items-center justify-center transition-all duration-300`}
          >
            {isListening ? (
              <MicOff className="h-8 w-8 text-white" />
            ) : (
              <Mic className="h-8 w-8 text-white" />
            )}
          </Button>
          <p className="mt-4 text-white text-center">
            {isListening 
              ? "Tap to stop recording" 
              : isProcessing
                ? "Processing your request"
                : "Tap to start speaking"}
          </p>
        </div>
        
        {/* Conversation Display */}
        <div className="flex-1">
          {transcript && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">You said:</h3>
              <div className="bg-gray-700/50 p-3 rounded text-white">{transcript}</div>
            </div>
          )}
          
          {response && (
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">AI Response:</h3>
              <div className="bg-purple-900/30 p-3 rounded text-white">{response}</div>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-white">
              {error}
            </div>
          )}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="text-center text-gray-400 text-sm">
        <p>Click the microphone to ask a question. The AI will respond based on our knowledge base.</p>
        <p className="mt-1">For best results, speak clearly and ask specific questions.</p>
      </div>
      
      {/* Hidden audio element for future TTS playback */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default VoiceAgentInterface;

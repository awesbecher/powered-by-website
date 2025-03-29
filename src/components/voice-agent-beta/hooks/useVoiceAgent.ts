import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { voiceAgentService } from '@/services/voiceAgentService';

export const useVoiceAgent = () => {
  // States for managing the voice agent process
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState<'idle' | 'recording' | 'transcribing' | 'searching' | 'generating' | 'speaking'>('idle');
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  
  // Using our custom audio recorder hook
  const { 
    isRecording, 
    startRecording, 
    stopRecording, 
    recordingTime, 
    audioURL, 
    error: recordingError 
  } = useAudioRecorder();
  
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Process the voice agent workflow
  const processVoiceQuery = async (audioBlob: Blob | null) => {
    if (!audioBlob) {
      handleError("No audio recorded");
      return;
    }
    
    try {
      setProcessingStage('transcribing');
      setIsProcessing(true);
      
      // Step 1: Convert speech to text using Whisper API
      const transcriptionResult = await voiceAgentService.transcribeSpeech(audioBlob, selectedLanguage || undefined);
      setTranscript(transcriptionResult.text);
      console.log("Transcript:", transcriptionResult);
      
      // Step 2: Query knowledge base using Pinecone through Make.com
      setProcessingStage('searching');
      const knowledgeChunks = await voiceAgentService.queryKnowledgeBase(transcriptionResult.text);
      console.log("Retrieved knowledge chunks:", knowledgeChunks);
      
      // Step 3: Generate response using GPT
      setProcessingStage('generating');
      const responseResult = await voiceAgentService.generateResponse(transcriptionResult.text, knowledgeChunks);
      setResponse(responseResult.text);
      console.log("Generated response:", responseResult);
      
      // Step 4: Convert text to speech using Cartesia.ai
      setProcessingStage('speaking');
      const speechResult = await voiceAgentService.generateSpeech(responseResult.text);
      console.log("Generated speech:", speechResult);
      
      // Log the conversation
      voiceAgentService.logConversation(transcriptionResult.text, responseResult.text, speechResult.audioUrl);
      
      // In a production system, we would play the audio from the URL
      setIsProcessing(false);
      setIsSpeaking(true);
      
      // Simulate speech playback for now
      setTimeout(() => {
        setIsSpeaking(false);
        setProcessingStage('idle');
      }, 4000);
      
    } catch (err) {
      handleError(`Error processing voice query: ${err instanceof Error ? err.message : String(err)}`);
    }
  };
  
  // Function to toggle recording state
  const toggleRecording = async () => {
    if (isRecording) {
      setProcessingStage('idle');
      const audioBlob = await stopRecording();
      processVoiceQuery(audioBlob);
    } else {
      setError(null);
      setTranscript("");
      setResponse("");
      setProcessingStage('recording');
      startRecording();
      
      toast({
        title: "Listening",
        description: "I'm listening to your question. Speak clearly.",
      });
    }
  };
  
  // Function to handle errors
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsProcessing(false);
    setIsSpeaking(false);
    setProcessingStage('idle');
    
    toast({
      variant: "destructive",
      title: "Error",
      description: "We are experiencing a technical fault with this service. Please attempt your conversation again.",
    });
    
    console.error(errorMessage);
  };

  return {
    isProcessing,
    isSpeaking,
    transcript,
    response,
    error,
    processingStage,
    selectedLanguage,
    setSelectedLanguage,
    isRecording,
    recordingTime,
    audioURL,
    recordingError,
    audioRef,
    toggleRecording,
    handleError
  };
};

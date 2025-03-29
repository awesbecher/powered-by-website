
import React, { useEffect } from 'react';
import { StatusIndicator } from './status/StatusIndicator';
import { LanguageSelector } from './language/LanguageSelector';
import { MicrophoneButton } from './microphone/MicrophoneButton';
import { ConversationDisplay } from './conversation/ConversationDisplay';
import { InstructionsText } from './instructions/InstructionsText';
import { useVoiceAgent } from './hooks/useVoiceAgent';

interface VoiceAgentInterfaceProps {
  // Props would be expanded as we integrate with external services
}

const VoiceAgentInterface: React.FC<VoiceAgentInterfaceProps> = () => {
  const {
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
    recordingError,
    audioRef,
    toggleRecording,
    handleError
  } = useVoiceAgent();
  
  // Handle any recording errors
  useEffect(() => {
    if (recordingError) {
      handleError(`Microphone error: ${recordingError}`);
    }
  }, [recordingError, handleError]);
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl border border-purple-500/30">
      {/* Status and Language Selection */}
      <div className="flex items-center justify-between mb-6">
        <StatusIndicator 
          processingStage={processingStage} 
          isRecording={isRecording} 
          isProcessing={isProcessing} 
          isSpeaking={isSpeaking} 
        />
        
        <LanguageSelector 
          selectedLanguage={selectedLanguage} 
          setSelectedLanguage={setSelectedLanguage} 
        />
      </div>
      
      {/* Main Interaction Area */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <MicrophoneButton 
          isRecording={isRecording} 
          isProcessing={isProcessing} 
          isSpeaking={isSpeaking} 
          recordingTime={recordingTime} 
          toggleRecording={toggleRecording} 
        />
        
        <ConversationDisplay 
          transcript={transcript} 
          response={response} 
          error={error} 
        />
      </div>
      
      {/* Instructions */}
      <InstructionsText />
      
      {/* Hidden audio element for TTS playback */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default VoiceAgentInterface;

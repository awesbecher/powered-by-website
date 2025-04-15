
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Mic, Upload, FileAudio, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { voiceAgentService } from '@/services/voiceAgentService';

interface VoiceTriggerProps {
  onTranscription: (text: string) => void;
  showCompact?: boolean;
}

const VoiceTrigger: React.FC<VoiceTriggerProps> = ({ onTranscription, showCompact = false }) => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { 
    isRecording, 
    startRecording, 
    stopRecording, 
    audioURL,
    error
  } = useAudioRecorder();

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    const validTypes = ['audio/mp3', 'audio/wav', 'audio/mpeg', 'audio/webm'];
    if (!validTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an MP3, WAV, or WebM audio file.",
      });
      return;
    }
    
    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Audio file must be less than 10MB.",
      });
      return;
    }
    
    setUploadedFile(file);
  };

  // Process uploaded file or recorded audio
  const handleTranscribe = async () => {
    try {
      setIsTranscribing(true);
      
      if (!uploadedFile && !audioURL) {
        throw new Error("No audio file to transcribe");
      }
      
      let audioBlob: Blob;
      
      // Get audio data from uploaded file or recorded audio
      if (uploadedFile) {
        audioBlob = uploadedFile;
      } else if (audioURL) {
        const response = await fetch(audioURL);
        audioBlob = await response.blob();
      } else {
        throw new Error("No audio file to transcribe");
      }
      
      // Transcribe audio using Whisper API via our service
      const result = await voiceAgentService.transcribeSpeech(audioBlob);
      
      if (result.text) {
        toast({
          title: "Transcription successful",
          description: "Audio has been transcribed successfully.",
        });
        
        // Pass the transcription to the parent component
        onTranscription(result.text);
        
        // Clear the uploaded file
        setUploadedFile(null);
      } else {
        throw new Error("Transcription failed");
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: error instanceof Error ? error.message : "Failed to transcribe audio. Please try again.",
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  // Recorder controls
  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Recording error",
        description: "Could not access microphone. Please check permissions.",
      });
      console.error("Error starting recording:", err);
    }
  };

  const handleStopRecording = async () => {
    await stopRecording();
  };

  // Compact mode renders just the buttons for integration into other components
  if (showCompact) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="file"
            id="audio-upload"
            accept="audio/mp3,audio/wav,audio/mpeg,audio/webm"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileUpload}
          />
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10"
            disabled={isRecording || isTranscribing}
          >
            <Upload size={16} />
          </Button>
        </div>
        
        <Button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          variant="outline"
          className={`border-white/20 text-white hover:bg-white/10 ${
            isRecording ? "bg-red-500/30 hover:bg-red-500/40" : ""
          }`}
          disabled={isTranscribing}
        >
          {isRecording ? (
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          ) : (
            <Mic size={16} />
          )}
        </Button>
        
        {(uploadedFile || audioURL) && (
          <Button
            onClick={handleTranscribe}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            disabled={isRecording || isTranscribing}
          >
            {isTranscribing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Bot size={16} />
            )}
          </Button>
        )}
      </div>
    );
  }

  // Full component with card and more information
  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">
            <Mic className="text-[#9b87f5]" size={24} />
          </span>
          Voice Trigger
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center text-white/80">
            {isRecording ? (
              <div className="animate-pulse">Recording... Click stop when finished</div>
            ) : uploadedFile ? (
              <div className="flex items-center justify-center gap-2">
                <FileAudio className="text-[#9b87f5]" size={24} />
                <span>{uploadedFile.name}</span>
              </div>
            ) : audioURL ? (
              <div className="flex flex-col items-center gap-2">
                <FileAudio className="text-[#9b87f5]" size={24} />
                <audio src={audioURL} controls className="max-w-full" />
              </div>
            ) : (
              <div>Upload an audio file or record your voice to trigger the agent</div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="relative">
              <input
                type="file"
                id="audio-upload"
                accept="audio/mp3,audio/wav,audio/mpeg,audio/webm"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileUpload}
                disabled={isRecording || isTranscribing}
              />
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                disabled={isRecording || isTranscribing}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Audio
              </Button>
            </div>

            <Button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              variant={isRecording ? "destructive" : "outline"}
              className={!isRecording ? "border-white/20 text-white hover:bg-white/10" : ""}
              disabled={isTranscribing}
            >
              {isRecording ? (
                <>
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" />
                  Record Audio
                </>
              )}
            </Button>
            
            {(uploadedFile || audioURL) && (
              <Button
                onClick={handleTranscribe}
                className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
                disabled={isRecording || isTranscribing}
              >
                {isTranscribing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Transcribing...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Transcribe & Trigger Agent
                  </>
                )}
              </Button>
            )}
          </div>
          
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceTrigger;

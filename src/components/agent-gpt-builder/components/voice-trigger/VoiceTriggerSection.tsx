
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceTrigger from "../voice-agent-builder/VoiceTrigger";
import { Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceTriggerSectionProps {
  onTranscription: (text: string) => void;
}

const VoiceTriggerSection: React.FC<VoiceTriggerSectionProps> = ({ onTranscription }) => {
  const [transcribedText, setTranscribedText] = useState<string | null>(null);

  const handleTranscription = (text: string) => {
    setTranscribedText(text);
    onTranscription(text);
  };

  const handleTriggerAgent = () => {
    if (transcribedText) {
      onTranscription(transcribedText);
    }
  };

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#2f1c4a] to-[#1a0b2e] shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">
            <Bot className="text-[#9b87f5]" size={24} />
          </span>
          Voice Agent Trigger
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-white/80 mb-4">
            Follow these steps to trigger your agent using voice:
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 bg-[#1a0b2e]/60 p-4 rounded-lg border border-white/10">
              <div className="text-center mb-4">
                <div className="inline-block bg-[#9b87f5]/20 p-2 rounded-full mb-2">
                  <Bot className="text-[#9b87f5]" size={24} />
                </div>
                <h3 className="text-white font-medium">Step 1: Record or Upload</h3>
              </div>
              <VoiceTrigger onTranscription={handleTranscription} />
            </div>
            
            <div className="hidden md:flex">
              <ArrowRight className="text-[#9b87f5]" size={24} />
            </div>
            
            <div className="flex-1 bg-[#1a0b2e]/60 p-4 rounded-lg border border-white/10">
              <div className="text-center mb-4">
                <div className="inline-block bg-[#9b87f5]/20 p-2 rounded-full mb-2">
                  <Bot className="text-[#9b87f5]" size={24} />
                </div>
                <h3 className="text-white font-medium">Step 2: Transcription Result</h3>
              </div>
              {transcribedText ? (
                <div className="bg-[#1a0b2e]/60 p-4 rounded-lg border border-[#9b87f5]/30 text-white min-h-[100px] max-h-[200px] overflow-y-auto break-words">
                  {transcribedText}
                </div>
              ) : (
                <div className="bg-[#1a0b2e]/60 p-4 rounded-lg border border-white/10 text-white/50 min-h-[100px] flex items-center justify-center text-center">
                  Your transcribed text will appear here...
                </div>
              )}
            </div>
            
            <div className="hidden md:flex">
              <ArrowRight className="text-[#9b87f5]" size={24} />
            </div>
            
            <div className="flex-1 bg-[#1a0b2e]/60 p-4 rounded-lg border border-white/10">
              <div className="text-center mb-4">
                <div className="inline-block bg-[#9b87f5]/20 p-2 rounded-full mb-2">
                  <Bot className="text-[#9b87f5]" size={24} />
                </div>
                <h3 className="text-white font-medium">Step 3: Trigger Agent</h3>
              </div>
              <Button
                onClick={handleTriggerAgent}
                disabled={!transcribedText}
                className="w-full bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white font-medium"
              >
                {transcribedText ? "Trigger Agent Now" : "Waiting for Transcription..."}
              </Button>
              <p className="text-white/60 text-xs mt-2 text-center">
                This will use the transcribed text to activate your agent
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceTriggerSection;

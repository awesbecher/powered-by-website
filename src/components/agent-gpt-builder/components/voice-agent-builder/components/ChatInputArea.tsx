
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, Mic } from "lucide-react";
import VoiceTrigger from "../VoiceTrigger";

interface ChatInputAreaProps {
  userInput: string;
  setUserInput: (input: string) => void;
  loading: boolean;
  isListening: boolean;
  onSendMessage: (input: string) => void;
  onStartVoiceInput: () => void;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  userInput,
  setUserInput,
  loading,
  isListening,
  onSendMessage,
  onStartVoiceInput
}) => {
  const handleTranscription = (text: string) => {
    setUserInput(text);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          className="bg-[#1a0b2e]/40 border-white/10 text-white"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message or use the mic..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (userInput.trim()) {
                onSendMessage(userInput);
              }
            }
          }}
        />
        <Button 
          onClick={() => onSendMessage(userInput)} 
          disabled={loading || !userInput}
          className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
          ) : (
            <SendIcon size={16} />
          )}
        </Button>
        <Button 
          onClick={onStartVoiceInput} 
          disabled={isListening || loading}
          className={`${isListening 
            ? "bg-red-500 hover:bg-red-600" 
            : "bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
          } text-white`}
        >
          <Mic size={16} className={isListening ? "animate-pulse" : ""} />
        </Button>
      </div>
      
      {/* Add voice trigger component in compact mode */}
      <div className="flex justify-end">
        <VoiceTrigger onTranscription={handleTranscription} showCompact={true} />
      </div>
      
      {isListening && (
        <div className="text-center text-white/70 text-sm animate-pulse">
          Listening... Speak now
        </div>
      )}
    </div>
  );
};

export default ChatInputArea;

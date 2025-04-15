
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";

interface ChatInputAreaProps {
  userInput: string;
  setUserInput: (input: string) => void;
  loading: boolean;
  isListening: boolean;
  onSendMessage: () => void;
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
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          className="bg-[#1a0b2e]/40 border-white/10 text-white"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
        />
        <Button 
          onClick={onSendMessage} 
          disabled={loading || !userInput}
          className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send size={16} strokeWidth={3} className="text-white" />
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
      
      {isListening && (
        <div className="text-center text-white/70 text-sm animate-pulse">
          Listening... Speak now
        </div>
      )}
    </div>
  );
};

export default ChatInputArea;


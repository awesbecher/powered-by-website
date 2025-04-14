
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mic, Send, Copy, FileDown, ArrowLeft } from "lucide-react";
import { AgentTemplate } from "./types";
import { ChatMessage } from "@/services/openaiService";

interface AgentChatProps {
  selectedTemplate: AgentTemplate;
  messages: ChatMessage[];
  userInput: string;
  setUserInput: (input: string) => void;
  loading: boolean;
  isListening: boolean;
  onSendMessage: () => void;
  onStartVoiceInput: () => void;
  onGenerateEmbedCode: () => void;
  onGenerateOpenAPISpec: () => void;
  onBack: () => void;
}

const AgentChat: React.FC<AgentChatProps> = ({
  selectedTemplate,
  messages,
  userInput,
  setUserInput,
  loading,
  isListening,
  onSendMessage,
  onStartVoiceInput,
  onGenerateEmbedCode,
  onGenerateOpenAPISpec,
  onBack
}) => {
  if (!selectedTemplate) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">🤖</span>
          {selectedTemplate.name}
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60"
          onClick={onBack}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Templates
        </Button>
      </div>
      
      <div className="bg-[#1a0b2e]/40 rounded-xl p-4 max-h-[300px] overflow-y-auto border border-white/10">
        {messages.filter(msg => msg.role !== "system").map((msg, i) => (
          <div 
            key={i} 
            className={`mb-3 p-3 rounded-lg ${
              msg.role === "user" 
                ? "bg-[#9b87f5]/20 ml-8 mr-2 border border-[#9b87f5]/20" 
                : "bg-[#1a0b2e]/60 mr-8 ml-2 border border-white/5"
            } animate-fade-in`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="text-sm text-gray-400 mb-1">
              {msg.role === "user" ? "You" : "Agent"}
            </div>
            <div className="text-white whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
        
        {messages.length <= 1 && (
          <div className="text-center py-8 text-white/50">
            <p>Start interacting with your agent by typing a message or using the mic button.</p>
          </div>
        )}
      </div>

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
              <Send size={16} />
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

      <div className="pt-4 border-t border-white/10">
        <div className="font-medium text-white mb-2">Export Options:</div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60"
            onClick={onGenerateEmbedCode}
          >
            <Copy size={16} className="mr-2" />
            Copy Embed Snippet
          </Button>
          <Button
            variant="outline"
            className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60"
            onClick={onGenerateOpenAPISpec}
          >
            <FileDown size={16} className="mr-2" />
            Download OpenAPI Spec
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;

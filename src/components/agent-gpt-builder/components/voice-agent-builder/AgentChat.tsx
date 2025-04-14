
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Message, AgentTemplate } from "./types";
import ChatMessageList from "./components/ChatMessageList";
import ChatInputArea from "./components/ChatInputArea";
import AgentHeader from "./components/AgentHeader";
import ExportOptionsPanel from "./components/ExportOptionsPanel";

interface AgentChatProps {
  selectedTemplate: AgentTemplate;
  messages: Message[];
  userInput: string;
  setUserInput: (value: string) => void;
  loading: boolean;
  isListening: boolean;
  onSendMessage: (text?: string) => void;
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
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/10 p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <AgentHeader selectedTemplate={selectedTemplate} />
      </div>
      
      <ChatMessageList messages={messages} />
      
      <ChatInputArea
        userInput={userInput}
        setUserInput={setUserInput}
        loading={loading}
        isListening={isListening}
        onSendMessage={onSendMessage}
        onStartVoiceInput={onStartVoiceInput}
      />
      
      <ExportOptionsPanel
        onGenerateEmbedCode={onGenerateEmbedCode}
        onGenerateOpenAPISpec={onGenerateOpenAPISpec}
        selectedTemplate={selectedTemplate}
      />
    </div>
  );
};

export default AgentChat;

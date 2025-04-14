
import React from "react";
import { AgentTemplate, Message } from "./types";
import AgentHeader from "./components/AgentHeader";
import ChatMessageList from "./components/ChatMessageList";
import ChatInputArea from "./components/ChatInputArea";
import ExportOptionsPanel from "./components/ExportOptionsPanel";

interface AgentChatProps {
  selectedTemplate: AgentTemplate;
  messages: Message[];
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
      <AgentHeader 
        selectedTemplate={selectedTemplate} 
        onBack={onBack} 
      />
      
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
      />
    </div>
  );
};

export default AgentChat;

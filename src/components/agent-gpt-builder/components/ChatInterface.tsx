
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatMessage } from "@/services/openaiService";
import { Loader2, Send, Bot } from "lucide-react";
import VoiceTrigger from "./voice-agent-builder/VoiceTrigger";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  isLoading: boolean;
  handleSendMessage: () => void;
  getStarterPrompt: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  isLoading,
  handleSendMessage,
  getStarterPrompt,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle voice transcription
  const handleTranscription = (text: string) => {
    setInputMessage(text);
  };

  return (
    <Card className="h-[700px] bg-gradient-to-br from-[#2f1c4a] via-[#1a0b2e] to-[#251640] border border-[#9b87f5]/20 shadow-xl overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#9b87f5]/20">
      <CardHeader className="bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e] border-b border-white/10 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#9b87f5]/20 p-2 rounded-full transition-all duration-300 hover:bg-[#9b87f5]/30">
              <Bot className="h-5 w-5 text-[#9b87f5]" />
            </div>
            <CardTitle className="text-white text-xl">Voice Agent Builder Assistant</CardTitle>
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-2">
          Chat with our interactive AI Agent Builder to design your custom voice agent for your business
        </p>
      </CardHeader>
      
      <CardContent className="p-5 h-[480px] overflow-y-auto bg-gradient-to-b from-transparent to-[#1a0b2e]/20">
        {messages.length === 0 ? (
          <EmptyChat setInputMessage={setInputMessage} />
        ) : (
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${
                    msg.role === "user"
                      ? "bg-[#9b87f5]/30 text-white border border-[#9b87f5]/30 hover:border-[#9b87f5]/50"
                      : "bg-[#1a0b2e]/60 text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-white/10 p-4 bg-[#1a0b2e]/30">
        <div className="w-full space-y-4">
          <div className="flex gap-2 w-full">
            <Textarea
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="min-h-[60px] bg-[#1a0b2e]/40 border-white/20 text-white resize-none focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/20 rounded-xl transition-all duration-200"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white rounded-xl shadow-lg shadow-[#9b87f5]/20 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Voice Trigger Component */}
          <div className="flex justify-end">
            <VoiceTrigger onTranscription={handleTranscription} showCompact={true} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const EmptyChat: React.FC<{ setInputMessage: (message: string) => void }> = ({ setInputMessage }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
      <div className="bg-[#9b87f5]/10 p-4 rounded-full mb-4 transition-all duration-300 hover:bg-[#9b87f5]/20 transform hover:scale-105">
        <img 
          src="/assets/images/273d4b9e-a8a8-49f9-9309-824aa7cd2711.png" 
          alt="Voice Agent Builder Icon" 
          className="h-10 w-10"
        />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">Welcome to the <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> AI Voice Agent Builder!</h3>
      <p className="text-gray-300 max-w-md mx-auto mb-6">
        Tell me about your business and what kind of voice agent you'd like to create. 
        I'll help you design the perfect agent for your needs.
      </p>
      <div className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
        <Button 
          onClick={() => setInputMessage("I need a voice agent for my healthcare clinic to handle appointment scheduling.")}
          className="bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e] border border-[#9b87f5]/30 hover:from-[#3a2360] hover:to-[#251640] text-gray-200 transition-all duration-200 transform hover:scale-105 hover:border-[#9b87f5]/60"
          size="sm"
        >
          Healthcare Agent
        </Button>
        <Button 
          onClick={() => setInputMessage("I want a voice agent for my restaurant to take reservations and answer menu questions.")}
          className="bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e] border border-[#9b87f5]/30 hover:from-[#3a2360] hover:to-[#251640] text-gray-200 transition-all duration-200 transform hover:scale-105 hover:border-[#9b87f5]/60"
          size="sm"
        >
          Restaurant Agent
        </Button>
        <Button 
          onClick={() => setInputMessage("I need a voice agent for my retail store to handle customer service inquiries.")}
          className="bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e] border border-[#9b87f5]/30 hover:from-[#3a2360] hover:to-[#251640] text-gray-200 transition-all duration-200 transform hover:scale-105 hover:border-[#9b87f5]/60"
          size="sm"
        >
          Retail Agent
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;

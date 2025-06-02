
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ChatMessage } from "@/services/openaiService";

interface AgentTestInterfaceProps {
  messages: ChatMessage[];
  handleSendMessage: () => void;
  userInput: string;
  setUserInput: (input: string) => void;
  loading: boolean;
  agentInstructions: string;
}

const AgentTestInterface: React.FC<AgentTestInterfaceProps> = ({
  messages,
  handleSendMessage,
  userInput,
  setUserInput,
  loading,
  agentInstructions,
}) => {
  return (
    <>
      {messages.length > 1 ? (
        <div className="bg-[#1a0b2e]/40 rounded-xl p-4 mb-6 max-h-[300px] overflow-y-auto border border-white/10">
          {messages.map((msg, idx) => {
            // Skip the system message in the display
            if (msg.role === "system") return null;
            
            return (
              <div 
                key={idx} 
                className={`mb-3 p-3 rounded-lg ${
                  msg.role === "user" 
                    ? "bg-[#9b87f5]/20 ml-8 mr-2 border border-[#9b87f5]/20" 
                    : "bg-[#1a0b2e]/60 mr-8 ml-2 border border-white/5"
                } animate-fade-in`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-sm text-gray-400 mb-1">
                  {msg.role === "user" ? "You" : "Agent"}
                </div>
                <div className="text-white whitespace-pre-wrap">{msg.content}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center my-6 text-gray-400">
          <p>Start testing your voice agent by sending a message below.</p>
          <p className="text-sm mt-2">Your agent will respond based on the instructions you've provided.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Textarea
          placeholder="Ask your agent a question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="bg-[#1a0b2e]/40 border-white/10 text-white resize-none min-h-[80px]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        
        <Button 
          onClick={handleSendMessage} 
          disabled={loading || !userInput.trim() || !agentInstructions}
          className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white shadow-lg shadow-[#9b87f5]/20"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {loading ? "Generating response..." : "Test Your Agent"}
        </Button>
      </div>
    </>
  );
};

export default AgentTestInterface;

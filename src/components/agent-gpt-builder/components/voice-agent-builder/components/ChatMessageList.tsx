
import React from "react";
import { Message } from "../types";

interface ChatMessageListProps {
  messages: Message[];
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
  return (
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
  );
};

export default ChatMessageList;

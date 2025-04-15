
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown"; 

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  isLoading: boolean;
  handleSendMessage: (message: string) => void;
  getStarterPrompt: () => string;
  disabled?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  isLoading,
  handleSendMessage,
  getStarterPrompt,
  disabled = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (!isScrolling && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isScrolling]);

  const handleSend = () => {
    if (inputMessage.trim() && !isLoading && !disabled) {
      handleSendMessage(inputMessage);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputMessage.trim() && !isLoading && !disabled) {
      handleSendMessage(inputMessage);
    }
  };
  
  const handleScrollStart = () => {
    setIsScrolling(true);
  };
  
  const handleScrollEnd = () => {
    setIsScrolling(false);
  };
  
  const addStarterPrompt = () => {
    setInputMessage(getStarterPrompt());
  };

  return (
    <Card className="border border-gray-700 bg-gray-900 shadow-xl rounded-xl h-[650px] flex flex-col">
      <CardHeader className="border-b border-gray-800 bg-gray-800/50 px-6 py-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Bot className="h-5 w-5 text-purple-400" />
          Agent Chat
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col p-0 overflow-hidden">
        <ScrollArea 
          className="flex-grow p-6" 
          onScrollCapture={handleScrollStart}
          onWheelCapture={handleScrollStart}
          onMouseUpCapture={handleScrollEnd}
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <Sparkles className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-200 mb-2">Start chatting with your agent</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Ask your agent questions to test how it would respond with your current configuration, or try a starter prompt.
              </p>
              <Button 
                variant="outline" 
                className="border-purple-500 text-purple-400 hover:bg-purple-950/30"
                onClick={addStarterPrompt}
              >
                Use Starter Prompt
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex gap-3 ${
                    message.role === 'assistant' ? "items-start" : "items-start"
                  }`}
                >
                  <div className={`rounded-full p-1.5 h-8 w-8 flex items-center justify-center flex-shrink-0 ${
                    message.role === 'assistant' 
                      ? "bg-purple-900/40 text-purple-300" 
                      : "bg-blue-900/40 text-blue-300"
                  }`}>
                    {message.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`rounded-xl py-2 px-3 max-w-[85%] ${
                    message.role === 'assistant' 
                      ? "bg-gray-800/50" 
                      : "bg-purple-900/25"
                  }`}>
                    <ReactMarkdown className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-2 prose-pre:rounded prose-pre:bg-gray-900">
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
        
        <div className="border-t border-gray-800 p-4">
          <div className="flex gap-2">
            <Input
              placeholder={disabled ? "Upgrade your plan to send more messages" : "Type a message..."}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-gray-800 border-gray-700"
              disabled={isLoading || disabled}
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !inputMessage.trim() || disabled} 
              className="bg-purple-700 hover:bg-purple-600"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          {disabled && (
            <p className="text-amber-500 text-xs mt-2">
              You've reached your message limit. Please 
              <a href="/pricing" className="underline mx-1">upgrade your plan</a>
              to continue.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;

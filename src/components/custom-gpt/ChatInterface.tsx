
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';

export const ChatInterface = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: "Hello! I'm the Voice Agent GPT Assistant. How can I help you today with voice agent technology and implementations?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setInput('');
    
    // Simulate loading state
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "Voice agents can significantly improve customer service by providing 24/7 availability and handling routine inquiries, freeing up human agents for more complex issues.",
        "Implementing voice agents is typically a straightforward process that involves defining your use cases, selecting the right platform, and designing conversation flows.",
        "Our voice agents use natural language processing to understand customer intent, making conversations feel more natural and engaging.",
        "Voice agents can be deployed across multiple channels including phone, web, and mobile applications to provide a consistent experience.",
        "For businesses in the retail sector, voice agents can help with inventory inquiries, order tracking, and product recommendations."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-xl overflow-hidden bg-[#1a0b2e]/30 border-white/5">
      {/* Chat messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`mb-4 ${msg.role === 'assistant' ? 'mr-12' : 'ml-12'}`}
          >
            <div 
              className={`p-4 rounded-lg ${
                msg.role === 'assistant' 
                  ? 'bg-[#2f1c4a] text-white' 
                  : 'bg-[#9b87f5]/20 text-white ml-auto'
              }`}
            >
              {msg.content}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {msg.role === 'assistant' ? 'Voice Agent GPT Assistant' : 'You'}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 ml-4">
            <div className="w-2 h-2 rounded-full bg-[#9b87f5] animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#9b87f5] animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#9b87f5] animate-bounce" style={{ animationDelay: '600ms' }}></div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-white/10 p-4 bg-[#1a0b2e]/50">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-[#2f1c4a]/50 border-white/10 text-white resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-[#9b87f5] hover:bg-[#7a68c9] text-white"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

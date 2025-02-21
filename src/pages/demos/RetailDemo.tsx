
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const RetailDemo = () => {
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'ai'}[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Thank you for your message! I'm an AI retail assistant. How can I help you today?",
        sender: 'ai'
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#222222]">
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
        <Link to="/">
          <img 
            src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
            alt="Parlar Logo"
            className="w-[192px] lg:w-[288px] h-auto"
          />
        </Link>
        <Navigation />
      </div>

      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Retail AI Assistant Demo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Experience how our AI can help handle customer inquiries, product recommendations, and sales support.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="mt-12 max-w-3xl mx-auto bg-black/50 backdrop-blur-xl rounded-xl p-6">
            <div className="flex flex-col h-[500px]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400">
                    Start a conversation with our retail AI assistant
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-accent text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default RetailDemo;

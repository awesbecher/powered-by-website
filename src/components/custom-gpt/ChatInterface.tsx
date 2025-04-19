import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Bot, Send, X, User, Loader2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { openaiService, ChatMessage } from "@/services/openaiService";

// System prompt for Michael
const SYSTEM_PROMPT = `You are Michael, a friendly and knowledgeable AI assistant for Powered_by Agency (poweredby.agency). Your goal is to help website visitors understand AI voice agents and their use cases, and guide them towards booking a demo or consultation.

## About Powered_by Agency:
- Industry leader in AI voice agent technology
- Helps businesses deploy custom AI agents across voice, chat, and email channels
- Works with industries including healthcare, hospitality, real estate, SaaS, and retail
- Offers end-to-end development, deployment and maintenance of AI agents

## Your Personality:
- Friendly and conversational, but professional
- Knowledgeable about AI technology and voice agents
- Helpful without being pushy or overly salesy
- Patient and thorough in explanations

## Key Features of Powered_by Voice Agents:
- 24/7 availability for customer interactions
- Natural-sounding voice and conversation flow
- Custom knowledge base integration
- Multi-channel deployment (phone, website, mobile)
- Analytics and performance tracking
- Escalation to human agents when needed
- Integration with booking/scheduling systems

## Your Primary Tasks:
1. Answer questions about Powered_by's AI voice agent technology
2. Explain specific use cases for different industries
3. Describe the implementation process and timeline
4. Provide pricing information (starting at $199/month for standard voice agents)
5. Guide visitors towards the next steps (free demo, consultation call)

## Important Guidelines:
- Always suggest booking a call for detailed discussions: https://cal.com/team-powered-by-dfbtbb/get-started-today
- Before ending conversations, collect contact information (name, email, company)
- Be accurate and honest about capabilities
- If you don't know something, say so rather than inventing information
- Keep responses concise but informative (2-3 paragraphs max)
- Use examples specific to the visitor's industry when possible

## Contact Information Collection:
Before ending any substantive conversation, make sure to collect:
- Name
- Email address
- Company name
This information will be used to follow up with custom materials and demo options.`;

// Lead capture state type
type LeadInfo = {
  name: string;
  email: string;
  company: string;
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "assistant", content: "Hi, I'm Michael — your AI agent guide at Powered_by. How can I help you understand AI voice technology today?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadInfo | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Typing effect for assistant messages
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isShowingTypingEffect, setIsShowingTypingEffect] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // Function to handle typing effect
  useEffect(() => {
    if (isShowingTypingEffect && currentMessageIndex < messages.length) {
      const message = messages[currentMessageIndex];
      if (message.role === "assistant" && currentCharIndex < message.content.length) {
        const timer = setTimeout(() => {
          setDisplayedResponse(message.content.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        }, 15); // Speed of typing
        return () => clearTimeout(timer);
      } else if (currentCharIndex >= message.content.length && currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex(currentMessageIndex + 1);
        setCurrentCharIndex(0);
        setDisplayedResponse("");
      } else {
        setIsShowingTypingEffect(false);
      }
    }
  }, [isShowingTypingEffect, currentMessageIndex, currentCharIndex, messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedResponse]);

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: ChatMessage = { role: "user", content: inputMessage };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await openaiService.generateChatCompletion(updatedMessages);
      const assistantResponse = response.message;

      // Check if response contains request for contact information
      const requestsContactInfo = assistantResponse.content.toLowerCase().includes("email") && 
                                  assistantResponse.content.toLowerCase().includes("name") &&
                                  assistantResponse.content.toLowerCase().includes("company");
      
      if (requestsContactInfo && !leadInfo) {
        setShowLeadForm(true);
      }
      
      setMessages([...updatedMessages, assistantResponse]);

      // Start typing effect for new message
      setCurrentMessageIndex(updatedMessages.length);
      setCurrentCharIndex(0);
      setDisplayedResponse("");
      setIsShowingTypingEffect(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      console.error("Error getting chat response:", error);
    } finally {
      setIsTyping(false);
    }
  };

  // Submit lead information
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/gpt-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company
        }),
      });

      if (response.ok) {
        setLeadInfo({
          name: formData.name,
          email: formData.email,
          company: formData.company,
        });
        setShowLeadForm(false);
        
        // Add a system message acknowledging receipt of information
        const confirmationMessage: ChatMessage = { 
          role: "assistant", 
          content: `Thanks ${formData.name}! I've got your contact information. The Powered_by team will send you some materials shortly. In the meantime, would you like to book a call to discuss your specific needs?` 
        };
        setMessages(prev => [...prev, confirmationMessage]);
        
        toast({
          title: "Success!",
          description: "Your information has been submitted.",
        });
      } else {
        throw new Error("Failed to submit lead information");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your information. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle booking a call
  const handleBookCall = () => {
    window.open("https://cal.com/team-powered-by-dfbtbb/get-started-today", "_blank");
  };

  return (
    <div className="relative">
      {/* Floating chat button (only shown when chat is minimized) */}
      {!showChat && (
        <div 
          className="fixed bottom-5 right-5 z-50 bg-[#8B5CF6] p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110"
          onClick={() => setShowChat(true)}
        >
          <Bot className="h-6 w-6 text-white" />
        </div>
      )}
      
      {/* Chat interface */}
      {showChat && (
        <div className="w-full max-w-md mx-auto">
          <Card className="border border-white/10 bg-[#1a0b2e]/90 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#1a0b2e] to-[#2f1c4a] p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2 bg-[#8B5CF6]">
                  <Bot className="h-5 w-5 text-white" />
                </Avatar>
                <div>
                  <h2 className="text-white font-medium">Michael</h2>
                  <p className="text-gray-300 text-xs">Powered_by AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isOpen ? (
                  <ChevronDown 
                    className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" 
                    onClick={() => setIsOpen(false)}
                  />
                ) : (
                  <ChevronUp 
                    className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" 
                    onClick={() => setIsOpen(true)}
                  />
                )}
                <X 
                  className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" 
                  onClick={() => setShowChat(false)}
                />
              </div>
            </CardHeader>
            
            {isOpen && (
              <>
                <CardContent className={`h-[400px] overflow-y-auto p-4 bg-gradient-to-b from-[#1a0b2e]/70 to-[#2f1c4a]/70 ${showLeadForm ? 'bg-opacity-50 flex items-center justify-center' : ''}`}>
                  {showLeadForm ? (
                    <div className="w-full max-w-sm p-5 rounded-lg backdrop-blur-md bg-black/20 border border-[#8B5CF6]/30">
                      <h3 className="text-lg font-medium text-white mb-4">Share Your Details</h3>
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="text-sm text-gray-300">Name</label>
                          <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            className="w-full p-2 rounded bg-[#1a0b2e] border border-[#8B5CF6]/30 text-white mt-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="text-sm text-gray-300">Email</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            className="w-full p-2 rounded bg-[#1a0b2e] border border-[#8B5CF6]/30 text-white mt-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="text-sm text-gray-300">Company</label>
                          <input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleFormChange}
                            className="w-full p-2 rounded bg-[#1a0b2e] border border-[#8B5CF6]/30 text-white mt-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                            placeholder="Your company"
                            required
                          />
                        </div>
                        <div className="flex justify-between pt-2">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowLeadForm(false)}
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="submit"
                            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => {
                        if (message.role === "system") return null; // Don't show system messages
                        
                        const isLastAssistantMessage = 
                          message.role === "assistant" && 
                          index === messages.length - 1 && 
                          isShowingTypingEffect;
                        
                        return (
                          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className="flex items-start max-w-[80%]">
                              {message.role === "assistant" && (
                                <div className="mr-2 mt-1 flex-shrink-0">
                                  <Avatar className="h-8 w-8 bg-[#8B5CF6]">
                                    <Bot className="h-5 w-5 text-white" />
                                  </Avatar>
                                </div>
                              )}
                              
                              <div 
                                className={`rounded-2xl px-4 py-2 ${
                                  message.role === "user" 
                                    ? "bg-[#8B5CF6] text-white" 
                                    : "bg-[#1a1a1a]/60 border border-white/10 text-white"
                                }`}
                              >
                                {message.role === "assistant" && isLastAssistantMessage 
                                  ? displayedResponse 
                                  : message.content}
                                  
                                {message.role === "assistant" && isLastAssistantMessage && (
                                  <span className="inline-block h-4 w-2 bg-white/70 ml-1 animate-pulse"></span>
                                )}
                                
                                {/* Show booking CTA link in assistant messages if leadInfo exists */}
                                {message.role === "assistant" && leadInfo && message.content.includes("book a call") && (
                                  <div className="mt-2">
                                    <Button 
                                      onClick={handleBookCall}
                                      className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-sm px-3 py-1 h-auto flex items-center"
                                      size="sm"
                                    >
                                      Book a Call <ExternalLink className="ml-1 h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                              
                              {message.role === "user" && (
                                <div className="ml-2 mt-1 flex-shrink-0">
                                  <Avatar className="h-8 w-8 bg-[#2f1c4a]">
                                    <User className="h-5 w-5 text-white" />
                                  </Avatar>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div ref={endOfMessagesRef} />
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="p-3 border-t border-white/10 bg-[#1a0b2e]">
                  <div className="flex w-full items-end gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="min-h-[40px] bg-[#2f1c4a]/30 resize-none border-white/10 focus:border-[#8B5CF6] text-white flex-1"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={isTyping || showLeadForm}
                      rows={1}
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={isTyping || !inputMessage.trim() || showLeadForm}
                      className="bg-[#8B5CF6] hover:bg-[#7C3AED] h-[40px] w-[40px]"
                    >
                      {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;

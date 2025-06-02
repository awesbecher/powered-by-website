import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Bot, Send, X, User, Loader2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { openaiService, ChatMessage } from "@/services/openaiService";

// System prompt for Michael
const SYSTEM_PROMPT = `# Powered_by Chat Agent – Prompt for "Michael"

## 1 · Identity & Mission
You are Michael, the AI chat assistant on the Powered_by Agency website.
Your role is to help visitors understand:

1. What AI agents are and how they work.
2. Powered_by's product lineup (AI Voice Chat, AI Receptionist, AI Email Agent, AI SMS-Text Agent, AI Workflow Agent, Virtual SE, OutboundAI).
3. How these solutions can solve real-world SMB problems and fit the visitor's budget.

You think step-by-step, ask clarifying questions, and keep every reply truthful, concise, and personalised.

## 2 · Strict Scope Guardrails
* On-topic only. If asked about anything unrelated to Powered_by or its AI agents, politely refuse.
* Money. When repeating a visitor-supplied figure, spell it out ("one hundred thousand dollars").
* Time & dates. Write times naturally ("11:30 AM") and ordinals correctly ("April 22nd").
* Weekend meetings. If asked to book on Saturday/Sunday, reply:
  "Unfortunately, we can't offer any times over the weekend. Is there a weekday that works for you?"

## 3 · Conversation Flow

### 3.1 Opening
Start with a friendly greeting and ask about their business needs.

### 3.2 Language Handling
If a message isn't in English (and you can't understand it):
"I currently support English. Could you please ask your question in English?"

### 3.3 Discovery & Needs Assessment
1. "Could you tell me a bit about your business and industry?"
2. "What goals or priorities are top-of-mind right now?"
3. "What daily tasks or challenges eat the most time?"
4. "How do those challenges affect cost, time, or growth?"
5. "If you adopted AI, what would success look like?"

Confirm understanding by paraphrasing key points.

### 3.4 Solution Exploration
Match each pain point to the most relevant Powered_by product(s):

| Visitor Need | Typical Fit | One-line Benefit |
|--------------|-------------|------------------|
| 24/7 phone or website conversations | AI Voice Chat | Human-like voice & chat that never sleeps |
| Missed calls & receptionist costs | AI Receptionist | Always-on call handling, zero dropped calls |
| Inbox overload | AI Email Agent | Autonomously triages & replies to emails |
| Text-message follow-ups | AI SMS-Text Agent | Conversational SMS that books & reminds |
| Repetitive back-office tasks | AI Workflow Agent | Automates internal workflows end-to-end |
| Pre-sales demo capacity | Virtual SE | Unlimited AI pre-sales engineers on-demand |
| High-volume outreach | OutboundAI | Scales outbound calls with natural voices |

Emphasise Powered_by's core advantages: turnkey lifecycle ownership, 24/7 operation, ~10× cost efficiency, and rapid deployment "in days."

### 3.5 Resources & Email
When sending any resource (case study, demo, comparison):
1. Ask for email.
2. Echo it back once for confirmation.
3. Send immediately if correct; else re-confirm.

### 3.6 Scheduling
Propose a free 30-minute design consultation once interest is clear.
Offer to book now or share the calendar link: https://cal.com/team-powered-by-dfbtbb/get-started-today

## 4 · Lead Capture & Handoff
Before ending, ensure you have: visitor's name, business, confirmed email, and any booked time.
Summarise: "To recap: you run a [industry] business. Your main challenges are [X] and [Y]. We discussed [product] to solve those. We're set for a consultation on [date/time], and I'll email the invite to [email]."

## 5 · Tone & Style
Friendly consultant, not salesy. One idea or question at a time. Use the visitor's name when known. Jargon-light unless requested.

## 6 · Failure Modes
If something is outside scope or unknown:
"I'm sorry — this chat is only for topics related to Powered_by Agency's AI agent solutions."

After the farewell, do not send further messages unless the visitor writes again.`;

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

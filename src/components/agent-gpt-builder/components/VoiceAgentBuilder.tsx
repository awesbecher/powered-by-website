
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { openaiService } from "@/services/openaiService";
import { Mic, SendIcon, ArrowLeft } from "lucide-react";

interface AgentTemplate {
  name: string;
  prompt: string;
}

interface AgentTemplates {
  [key: string]: AgentTemplate;
}

const agentTemplates: AgentTemplates = {
  auto: {
    name: "Auto Dealerships - Virtual Sales Rep",
    prompt: "You are a friendly and knowledgeable car sales assistant. Help customers find the best vehicle based on their needs, preferences, and budget. Avoid jargon and keep your tone approachable.",
  },
  hospitality: {
    name: "Hotels & Hospitality - Automated Concierge",
    prompt: "You are a virtual hotel concierge. Assist guests with check-in, local recommendations, reservations, and amenities. Be helpful and professional.",
  },
  realEstate: {
    name: "Real Estate - Virtual Sales Agent",
    prompt: "You are a helpful real estate assistant that answers questions about properties, neighborhoods, financing options, and booking showings.",
  },
  saas: {
    name: "SaaS Companies - Voice-Enabled Support",
    prompt: "You are a tech support assistant for a SaaS company. Help with billing questions, login issues, and product tutorials. Be clear and calm.",
  },
  b2b: {
    name: "B2B Sales - Inbound Funnel Qualifier",
    prompt: "You are a B2B lead qualifier. Ask follow-up questions to understand the lead's company size, needs, and urgency. Summarize info clearly.",
  },
  retail: {
    name: "Retail Stores - Virtual Sales Associate",
    prompt: "You are a digital retail associate. Help users find products, check availability, and provide quick shopping tips. Be friendly and responsive.",
  },
  restaurants: {
    name: "Restaurants - Virtual Reservation Manager",
    prompt: "You are a restaurant reservation manager. Help guests book tables, answer menu questions, and explain specials. Be warm and welcoming.",
  },
  education: {
    name: "Education - Enrollment Assistant",
    prompt: "You are an education advisor helping prospective students with admissions, programs, and timelines. Be informative and supportive.",
  },
  finance: {
    name: "Finance & Insurance - Q&A Agent",
    prompt: "You are a financial assistant answering questions about insurance, policies, and investment basics. Keep responses clear and compliant.",
  },
  hr: {
    name: "Internal HR - Onboarding & FAQ Agent",
    prompt: "You are an HR onboarding bot for employees. Answer questions about benefits, policies, time off, and onboarding steps.",
  },
  multilingual: {
    name: "Multilingual Support - Global Customer Agent",
    prompt: "You are a multilingual support agent who can assist customers in various languages. Be concise and globally friendly.",
  },
  events: {
    name: "Events - Attendee Engagement Bot",
    prompt: "You are an event concierge bot. Help attendees with agendas, speaker info, and real-time updates. Keep it upbeat and helpful.",
  },
};

interface VoiceAgentBuilderProps {
  onSelectTemplate?: (template: AgentTemplate) => void;
}

const VoiceAgentBuilder: React.FC<VoiceAgentBuilderProps> = ({ onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [messages, setMessages] = useState<Array<{ role: "system" | "user" | "assistant"; content: string }>>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const handleTemplateSelect = (key: string) => {
    const template = agentTemplates[key];
    setSelectedTemplate(template);
    setMessages([{ role: "system", content: template.prompt }]);
    
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim() || !selectedTemplate) return;
    
    const userMessage = { role: "user" as const, content: inputText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await openaiService.generateChatCompletion(updatedMessages, {
        model: "gpt-4o",
        systemPrompt: selectedTemplate.prompt,
      });
      
      const aiMessage = response.message;
      setMessages([...updatedMessages, aiMessage]);
      speakText(aiMessage.content);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate a response. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      
      // Improved voice selection if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes("Google") || 
        voice.name.includes("Natural") || 
        voice.name.includes("Female")
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported in this browser");
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser. Try Chrome.",
      });
      return;
    }
    
    setIsListening(true);
    
    // @ts-ignore - webkitSpeechRecognition is not in the TypeScript types
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setUserInput(speechText);
      handleSendMessage(speechText);
      setIsListening(false);
    };

    recognition.onerror = (err: any) => {
      console.error("Speech recognition error", err);
      toast({
        variant: "destructive",
        title: "Voice Error",
        description: `Error: ${err.error}. Please try again.`,
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">🎙️</span>
          Voice-Enabled GPT Agent Templates
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {!selectedTemplate ? (
          <div>
            <p className="text-white/80 mb-4">Select an industry to launch a voice-enabled AI agent:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(agentTemplates).map(([key, val]) => (
                <div
                  key={key}
                  className="border border-white/10 rounded-lg p-4 cursor-pointer bg-[#1a0b2e]/40 hover:bg-[#2f1c4a]/40 transition-colors"
                  onClick={() => handleTemplateSelect(key)}
                >
                  <strong className="text-white block mb-1">{val.name.split(" - ")[0]}</strong>
                  <p className="text-white/70 text-sm">{val.name.split(" - ")[1]}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="bg-[#9b87f5]/20 p-1 rounded-md">🧠</span>
                {selectedTemplate.name}
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60"
                onClick={() => setSelectedTemplate(null)}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Templates
              </Button>
            </div>
            
            <div className="bg-[#1a0b2e]/40 rounded-xl p-4 mb-4 max-h-[300px] overflow-y-auto border border-white/10">
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

            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Input
                  className="bg-[#1a0b2e]/40 border-white/10 text-white"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your message or use the mic..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(userInput);
                    }
                  }}
                />
                <Button 
                  onClick={() => handleSendMessage(userInput)} 
                  disabled={loading || !userInput}
                  className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white"
                >
                  {loading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                  ) : (
                    <SendIcon size={16} />
                  )}
                </Button>
                <Button 
                  onClick={startVoiceInput} 
                  disabled={isListening || loading}
                  className={`${isListening 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
                  } text-white`}
                >
                  <Mic size={16} className={isListening ? "animate-pulse" : ""} />
                </Button>
              </div>
              
              {isListening && (
                <div className="text-center text-white/70 text-sm animate-pulse">
                  Listening... Speak now
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceAgentBuilder;

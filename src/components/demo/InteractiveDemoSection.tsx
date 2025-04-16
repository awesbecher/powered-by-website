
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Mic, Phone, MessageSquare, Mail, ArrowRight, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";

export const InteractiveDemoSection = () => {
  const [activeTab, setActiveTab] = useState("voice");
  const [showDialog, setShowDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleStartCall = async () => {
    setIsProcessing(true);
    try {
      console.log("Starting call with Vapi");
      const assistantId = "ebb38ba5-321a-49e4-b860-708bc864327f";
      await initiateVapiCall(assistantId);
      setIsCallActive(true);
      toast({
        title: "Call connected",
        description: "You are now speaking with our AI voice agent.",
      });
    } catch (error) {
      console.error("Error starting call:", error);
      toast({
        variant: "destructive",
        title: "Call failed",
        description: error instanceof Error ? error.message : "Please check your microphone settings and try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEndCall = async () => {
    try {
      console.log("Ending call with Vapi");
      await stopVapiCall();
      toast({
        title: "Call ended",
        description: "Thank you for trying our AI voice agent.",
      });
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setIsCallActive(false);
    }
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      handleEndCall();
    }
    setShowDialog(false);
  };

  const demoOptions = [
    {
      id: "voice",
      title: "Voice AI",
      icon: Mic,
      description: "Experience natural conversations with our AI voice agent",
      actionText: "Start Voice Chat",
      color: "bg-purple-600",
      isPopular: true
    },
    {
      id: "phone",
      title: "Phone AI",
      icon: Phone,
      description: "See how our AI handles customer service calls",
      actionText: "Watch Call Demo",
      color: "bg-blue-600"
    },
    {
      id: "chat",
      title: "Chat AI",
      icon: MessageSquare,
      description: "Engage with our text-based AI assistant",
      actionText: "Start Chat",
      color: "bg-green-600"
    },
    {
      id: "email",
      title: "Email AI",
      icon: Mail,
      description: "Discover AI-powered email response automation",
      actionText: "View Email Demo",
      color: "bg-amber-600"
    }
  ];

  return (
    <section id="interactive-demo" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] bg-clip-text text-transparent">
              Experience Our AI Demos
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how our AI agents can transform your business communications across multiple channels.
              Select any demo below to get started.
            </p>
          </div>

          <Tabs defaultValue="voice" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-gray-900/50 rounded-xl p-1 mb-10">
              {demoOptions.map(option => (
                <TabsTrigger 
                  key={option.id} 
                  value={option.id}
                  className="data-[state=active]:bg-[#6342ff] data-[state=active]:text-white rounded-lg font-medium"
                >
                  <option.icon className="mr-2 h-5 w-5" />
                  {option.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {demoOptions.map(option => (
              <TabsContent key={option.id} value={option.id} className="mt-0">
                <div className="bg-gradient-to-r from-[#1a0f2e] to-[#2a1c49] rounded-3xl border border-gray-800 overflow-hidden shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 lg:p-12">
                      <div className={`${option.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                        <option.icon className="h-7 w-7 text-white" />
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-bold mb-4">{option.title}</h3>
                      
                      <p className="text-gray-300 mb-6 text-lg">
                        {option.description}
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 text-[#9b87f5]">•</div>
                          <span className="text-gray-300">Natural language understanding for human-like interactions</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 text-[#9b87f5]">•</div>
                          <span className="text-gray-300">Contextual awareness to maintain conversation flow</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 text-[#9b87f5]">•</div>
                          <span className="text-gray-300">Seamless integration with your existing business systems</span>
                        </li>
                      </ul>
                      
                      <Button 
                        onClick={() => setShowDialog(true)}
                        className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-6 py-6 text-lg rounded-xl"
                      >
                        {option.actionText} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="bg-[#0f0a19] p-8 lg:p-0 flex items-center justify-center">
                      <div className="relative w-full max-w-md aspect-square">
                        <img 
                          src={`/lovable-uploads/${
                            option.id === "voice" ? "bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png" :
                            option.id === "phone" ? "a895d546-c44f-4953-843b-945b3573a24d.png" :
                            option.id === "chat" ? "1a963891-b5e5-4c4c-85fd-e5ec489343bd.png" :
                            "6c3f7264-17ad-411e-a2f3-69970fa1948a.png"
                          }`} 
                          alt={`${option.title} demo`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <p className="text-sm text-white font-medium">{option.title} Demo</p>
                        </div>
                        {option.isPopular && (
                          <div className="absolute top-4 right-4 bg-[#6342ff] px-3 py-1 rounded-full">
                            <p className="text-xs text-white font-medium">Most Popular</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </motion.div>

      {/* Voice Chat Dialog */}
      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-[#1a0f2e] text-white border-gray-800 sm:max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">AI Voice Demo</h2>
            <Button variant="ghost" size="icon" onClick={handleCloseDialog} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src="/lovable-uploads/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png"
                alt="AI Voice Agent"
                className="object-cover"
              />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            
            <h3 className="text-2xl font-bold text-white text-center">
              Voice Chat with Michael
            </h3>
            
            <p className="text-gray-300 text-center">
              You'll be able to have a voice conversation with our AI agent directly through your browser.
            </p>
            
            {isCallActive ? (
              <div className="flex flex-col w-full space-y-4">
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span>Call Active</span>
                  </div>
                  <span className="text-sm text-gray-400">00:00</span>
                </div>
                
                <Button 
                  onClick={handleEndCall}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                >
                  End Call
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleStartCall}
                disabled={isProcessing}
                className="w-full bg-[#6342ff] hover:bg-[#5233e0] text-white text-lg py-6"
              >
                {isProcessing ? "Connecting..." : "Start Voice Chat"}
              </Button>
            )}
            
            <p className="text-xs text-gray-400 text-center">
              By starting this demo, you consent to having a voice conversation with our AI agent.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

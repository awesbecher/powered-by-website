
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mic, MicOff, Phone, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DemoOption } from "./DemoData";

interface VoiceChatDialogProps {
  isCallActive: boolean;
  isProcessing: boolean;
  onStartCall: () => Promise<void>;
  onEndCall: () => Promise<void>;
  onClose: () => void;
  activeDemo?: DemoOption;
}

export const VoiceChatDialog = ({
  isCallActive,
  isProcessing,
  onStartCall,
  onEndCall,
  onClose,
  activeDemo
}: VoiceChatDialogProps) => {
  
  // Get avatar images for each industry
  const getAvatarImage = () => {
    if (!activeDemo) return "/assets/images/1a963891-b5e5-4c4c-85fd-e5ec489343bd.png";
    
    switch(activeDemo.id) {
      case "real-estate":
        return "/assets/images/2d521c8d-084d-4a87-8491-cb795033a1d6.png";
      case "auto-dealer":
        return "/assets/images/1a963891-b5e5-4c4c-85fd-e5ec489343bd.png";
      case "hospitality":
        return "/assets/images/75ff6e78-9db7-436e-a063-2b5f8c500ee7.png";
      case "retail":
        return "/assets/images/75237bd9-59bf-497d-89fc-9805c49cf84e.png";
      default:
        return "/assets/images/1a963891-b5e5-4c4c-85fd-e5ec489343bd.png";
    }
  };
  
  // Get agent name based on industry
  const getAgentName = () => {
    if (!activeDemo) return "AI Assistant";
    
    switch(activeDemo.id) {
      case "real-estate":
        return "Jeff Smith";
      case "auto-dealer":
        return "Dave Frankel";
      case "hospitality":
        return "Emma Foster";
      case "retail":
        return "Alex";
      default:
        return "AI Assistant";
    }
  };
  
  // Get organization name based on industry
  const getOrgName = () => {
    if (!activeDemo) return "Powered_by AI";
    
    switch(activeDemo.id) {
      case "real-estate":
        return "Township Real Estate";
      case "auto-dealer":
        return "Mercedes of Tacoma";
      case "hospitality":
        return "Grand Hotel Services";
      case "retail":
        return "Flagship Barbers";
      default:
        return "Powered_by AI";
    }
  };
  
  return (
    <>
      {isCallActive ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Voice Chat Active</h2>
            <Button variant="ghost" size="icon" onClick={onEndCall} className="rounded-full h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src={getAvatarImage()} alt={getAgentName()} />
                <AvatarFallback>{getAgentName().substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a0f2e]"></span>
            </div>
            <div>
              <p className="font-medium text-lg">{getAgentName()}</p>
              <p className="text-gray-400 text-sm">{getOrgName()}</p>
            </div>
          </div>
          
          <div className="bg-[#111]/50 rounded-lg p-4">
            <div className="text-sm text-gray-300">
              <p className="mb-2">
                <span className="font-semibold">Status:</span> Connected
              </p>
              <p>
                <span className="font-semibold">Speak:</span> Your microphone is active
              </p>
            </div>
            
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full animate-pulse ${
                      i % 2 === 0 ? "h-4 bg-[#6342ff]" : "h-2 bg-[#6342ff]/70"
                    }`}
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "1s",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onEndCall} 
            variant="destructive" 
            className="w-full py-6"
          >
            <Phone className="h-5 w-5 mr-2" /> End Voice Chat
          </Button>
        </div>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Start Voice Chat with {activeDemo ? getAgentName() : "our AI Assistant"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={getAvatarImage()} alt={getAgentName()} />
              <AvatarFallback>{activeDemo ? getAgentName().substring(0, 2) : "AI"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-lg">{getAgentName()}</p>
              <p className="text-gray-400 text-sm">{getOrgName()}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-300 mb-6">
            You'll be able to have a natural conversation with our {activeDemo?.title || "AI"} assistant using your microphone. 
            This demo showcases how our AI can handle {activeDemo?.title.toLowerCase() || "industry-specific"} conversations.
          </p>
          
          <div className="space-y-4">
            <div className="bg-[#111]/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                By continuing, you agree to allow microphone access for this demo. Your conversation will be processed 
                by our AI to provide relevant responses.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-gray-700 hover:bg-gray-800 hover:text-white flex-1"
              >
                Cancel
              </Button>
              
              <Button 
                onClick={onStartCall} 
                disabled={isProcessing}
                className="bg-[#6342ff] hover:bg-[#5233e0] flex-1"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mic className="mr-2 h-4 w-4" />
                    Start Voice Chat
                  </div>
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

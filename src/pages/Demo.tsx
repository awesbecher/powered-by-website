
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WordAnimation } from "@/components/home/WordAnimation";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import OfferButton from "@/components/home/OfferButton";
import { DemosList } from "@/components/demo/DemosList";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Re-added Button import

const Demo = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
    
    setInitialLoad(false);
  }, [location]);

  const handleOpenDialog = () => {
    console.log("Opening voice dialog");
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      handleEndCall();
    }
    setShowDialog(false);
  };

  const handleStartCall = async () => {
    setIsProcessing(true);
    try {
      console.log("Starting call with Vapi");
      const assistantId = "ebb38ba5-321a-49e4-b860-708bc864327f";
      await initiateVapiCall(assistantId);
      setIsCallActive(true);
      toast({
        title: "Call started",
        description: "You are now connected to our AI voice agent.",
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

  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 z-0">
        <img 
          src="/lovable-uploads/345292f3-50fe-4a71-8569-80b3786a097c.png" 
          alt="Tech workspace" 
          className="w-full h-[60vh] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/80 via-[#2f1c4a] to-[#1a0b2e]"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        <Navbar />
        
        <div className="relative overflow-hidden px-6 lg:px-8 pb-8 pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <OfferButton className="mb-8" />
              
              <h1 className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                See our <span className="text-[#9b87f5]">AI Agents</span> in Action!
              </h1>
              
              <p className={`mt-4 text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto font-bold transition-all duration-1000 delay-300 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                While <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> offers fully custom & multi-channel AI agent solutions, you can experience our pre-built voice agents by exploring the demos below.
              </p>
            </div>
          </div>
          
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>

        <DemosList />

        <ClosingCTA />
        <Footer />
      </div>

      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarImage
                src="/lovable-uploads/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png"
                alt="Michael, AI Voice Agent @ Powered_by Agency"
                className="object-cover"
              />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            
            <h2 className="text-3xl font-bold text-white text-center">
              Start Voice Chat with Michael @ Powered_By
            </h2>
            
            <p className="text-gray-300 text-lg text-center">
              You'll be able to have a voice conversation with Michael (our AI voice agent) directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
            </p>
            
            <p className="text-base text-gray-300">
              By clicking "Start Voice Chat", you consent to having a voice conversation with Powered_by's AI agent. You can end the conversation at any time.
            </p>
            
            {isCallActive ? (
              <div className="flex flex-col w-full space-y-4">
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span>Call Active</span>
                  </div>
                  <span>Active Call</span>
                </div>
                
                <Button 
                  onClick={handleEndCall}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                >
                  End Call
                </Button>
              </div>
            ) : (
              <div className="flex gap-4 w-full">
                <Button 
                  onClick={handleCloseDialog}
                  className="w-full bg-gray-700 hover:bg-gray-800 text-white text-lg py-6"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleStartCall}
                  disabled={isProcessing}
                  className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white text-lg py-6"
                >
                  {isProcessing ? "Starting..." : "Start Voice Chat Now"}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Demo;

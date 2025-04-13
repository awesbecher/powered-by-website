
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RoomServiceHeader } from "./components/RoomServiceHeader";
import { MenuDisplay } from "./components/MenuDisplay";
import { CallButton } from "./components/CallButton";
import { RoomServiceDialog } from "./components/RoomServiceDialog";
import Navbar from "@/components/layout/Navbar";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { useToast } from "@/hooks/use-toast";

const RoomService = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  // The Vapi Assistant ID for Room Service
  const ROOM_SERVICE_ASSISTANT_ID = "238616a3-b611-4faa-a216-74b8d7d8b277";

  const handleStartCall = async () => {
    setIsProcessing(true);
    try {
      // Initialize the Vapi call with the Room Service Assistant ID
      const success = await initiateVapiCall(ROOM_SERVICE_ASSISTANT_ID);
      
      if (success) {
        setIsCallActive(true);
        toast({
          title: "Connected to Room Service",
          description: "You're now speaking with our AI room service assistant.",
        });
      }
    } catch (error) {
      console.error("Failed to connect to room service:", error);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Please check your microphone settings and try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEndCall = () => {
    try {
      stopVapiCall();
      toast({
        title: "Call ended",
        description: "Thank you for using our room service.",
      });
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setIsCallActive(false);
      setIsDialogOpen(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white">
      {/* Add the standard Navbar component */}
      <Navbar />

      {/* Display Grandview Hotels logo */}
      <img 
        src="/lovable-uploads/e337da17-dd0b-4200-9f90-c1ff247c6038.png" 
        alt="Grandview Hotels Logo" 
        className="absolute top-8 right-8 z-20 h-16 w-auto object-contain"
      />

      <RoomServiceHeader />

      {/* Add a second Speak to Room Service button below the hero section */}
      <div className="container mx-auto px-4 -mt-8 mb-8 flex justify-center">
        <CallButton
          isProcessing={isProcessing}
          isCallActive={isCallActive}
          onClick={() => setIsDialogOpen(true)}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 -mt-16">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Our Menu</h2>
          <MenuDisplay />
          
          <CallButton
            isProcessing={isProcessing}
            isCallActive={isCallActive}
            onClick={() => setIsDialogOpen(true)}
          />
        </div>
      </div>

      <RoomServiceDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isCallActive={isCallActive}
        isProcessing={isProcessing}
        isMuted={isMuted}
        handleStartCall={handleStartCall}
        handleEndCall={handleEndCall}
        toggleMute={toggleMute}
      />
    </div>
  );
};

export default RoomService;

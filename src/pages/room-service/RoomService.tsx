import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CallConfirmationDialog } from "@/components/shared/CallConfirmationDialog";
import { CallInProgressDialog } from "@/components/shared/CallInProgressDialog";
import { RoomServiceHeader } from "./components/RoomServiceHeader";
import { MenuDisplay } from "./components/MenuDisplay";
import { CallButton } from "./components/CallButton";
import Navbar from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";
import { UseCaseExplainer } from "./components/UseCaseExplainer";
import { initiateVapiCall, endVapiCall } from "@/services/vapiService";

const RoomService = () => {
  // Dialog states
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCallInProgress, setShowCallInProgress] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStartCall = async () => {
    try {
      setIsLoading(true);
      // Initialize room service call using the working vapiService
      await initiateVapiCall('roomService');
      // Only if successful, close confirmation and show call dialog
      setShowConfirmation(false);
      setShowCallInProgress(true);
    } catch (error) {
      console.error('Call error details:', error);
      let errorMessage = "Failed to start the voice chat. Please try again.";
      
      if (error instanceof Error) {
        const errorText = error.message.toLowerCase();
        if (errorText.includes('permission denied') || errorText.includes('notallowederror')) {
          errorMessage = "Microphone access was denied. Please allow microphone access and try again.";
        } else if (errorText.includes('notfounderror')) {
          errorMessage = "No microphone found. Please check your microphone connection and try again.";
        } else if (errorText.includes('notreadableerror')) {
          errorMessage = "Could not access your microphone. Please check if another application is using it.";
        } else {
          errorMessage = `Voice chat error: ${error.message}`;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Call Error",
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await endVapiCall();
      setShowCallInProgress(false);
      setCallDuration(0);
    } catch (error) {
      console.error('Error ending call:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to end the call properly. Please refresh the page.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-neutral-900">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <RoomServiceHeader setShowCallDialog={setShowConfirmation} />
        <MenuDisplay />
        <UseCaseExplainer />
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogTitle className="sr-only">Start Room Service Call</DialogTitle>
          <CallConfirmationDialog
            onStartCall={handleStartCall}
            onClose={() => setShowConfirmation(false)}
            isLoading={isLoading}
            service="roomService"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showCallInProgress} onOpenChange={setShowCallInProgress}>
        <DialogContent>
          <DialogTitle className="sr-only">Room Service Call in Progress</DialogTitle>
          <CallInProgressDialog
            onEndCall={handleEndCall}
            callDuration={callDuration}
            setCallDuration={setCallDuration}
            service="roomService"
          />
        </DialogContent>
      </Dialog>

      <CallButton 
        onClick={() => setShowConfirmation(true)} 
        isProcessing={isLoading}
        isCallActive={showCallInProgress}
      />
    </div>
  );
};

export default RoomService;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RoomServiceHeader } from "./components/RoomServiceHeader";
import { MenuDisplay } from "./components/MenuDisplay";
import { CallButton } from "./components/CallButton";
import { RoomServiceDialog } from "./components/RoomServiceDialog";
import Navbar from "@/components/layout/Navbar";

const RoomService = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleStartCall = async () => {
    setIsProcessing(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsCallActive(true);
      setIsProcessing(false);
    }, 1500);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsDialogOpen(false);
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

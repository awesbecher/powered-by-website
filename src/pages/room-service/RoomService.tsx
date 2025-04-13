
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RoomServiceHeader } from "./components/RoomServiceHeader";
import { MenuDisplay } from "./components/MenuDisplay";
import { CallButton } from "./components/CallButton";
import { RoomServiceDialog } from "./components/RoomServiceDialog";

const RoomService = () => {
  const navigate = useNavigate();
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
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-20 text-white hover:text-purple-400 transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="font-medium">Back to Demos</span>
      </button>

      {/* Add Grandview Hotels logo to the upper right corner */}
      <img 
        src="/lovable-uploads/b6af6c58-a913-450a-aa63-3dc829dc55fd.png" 
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


import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Tv, ArrowRight } from "lucide-react";
import OmegaVoiceChatDialog from "@/components/omega/OmegaVoiceChatDialog";
import { useToast } from "@/hooks/use-toast";

const OmegaVoice1 = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/omega-pediatrics");
  };

  const handleStartVoiceChat = () => {
    // In a real implementation, this would initiate the voice chat
    toast({
      title: "Voice Chat Initiated",
      description: "This is a placeholder for the actual voice chat functionality.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/2855384c-487c-46d3-90a0-b663019ac215.png" 
            alt="Omega Pediatrics - Accessibility & Love" 
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
        
        <div className="flex flex-col items-center justify-center py-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-purple-200 py-2 px-6 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm">
            Omega Voice Agent: Draft 3-26-25
          </h1>
          
          {/* First row - Info box */}
          <div className="mt-6 w-full max-w-md px-10 py-4 bg-gradient-to-r from-purple-600/80 to-pink-500/80 rounded-full shadow-lg border border-purple-400/30 backdrop-blur-sm">
            <p className="text-white text-center font-bold">
              Meet Stella, Omega's AI Receptionist<br />
              Call her @ (888) 976 7507
            </p>
          </div>
          
          {/* Second row - First empty oval box */}
          <div className="mt-6 w-full max-w-md px-10 py-4 bg-gradient-to-r from-purple-600/80 to-pink-500/80 rounded-full shadow-lg border border-purple-400/30 backdrop-blur-sm">
            <p className="text-white text-center font-bold flex items-center justify-center">
              <Tv className="mr-2 h-5 w-5" />
              Watch a Sample of Stella's Digital Avatar
            </p>
          </div>
          
          {/* Third row - Second empty oval box */}
          <div 
            className="mt-6 w-full max-w-md px-10 py-4 bg-gradient-to-r from-purple-600/80 to-pink-500/80 rounded-full shadow-lg border border-purple-400/30 backdrop-blur-sm cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setIsDialogOpen(true)}
          >
            <p className="text-white text-center font-bold flex items-center justify-center">
              Click Here for Voice Chat
              <ArrowRight className="ml-2 h-5 w-5" />
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-16">
        <Button 
          variant="default" 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Voice Chat Dialog */}
      <OmegaVoiceChatDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onStartChat={handleStartVoiceChat}
      />

      <Footer />
    </div>
  );
};

export default OmegaVoice1;


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Activity, Mic, MicOff, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface VoiceChatDialogProps {
  showDialog: boolean;
  isCallActive: boolean;
  isSubmitting: boolean;
  handleCloseDialog: () => void;
  handleStartCall: () => void;
  handleEndCall: () => void;
  source?: 'voice-chat' | 'voice-business' | 'home';
}

export const VoiceChatDialog = ({
  showDialog,
  isCallActive,
  isSubmitting,
  handleCloseDialog,
  handleStartCall,
  handleEndCall,
  source = 'home',
}: VoiceChatDialogProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();

  const toggleMute = () => {
    // In a real implementation, this would interact with the Vapi SDK to mute/unmute
    setIsMuted(!isMuted);
  };

  const handleEndCallAndRedirect = () => {
    handleEndCall();
    navigate('/contact');
  };

  // Determine the text based on the source
  const getDialogContent = () => {
    if (source === 'voice-chat') {
      return {
        title: "Start Voice Chat with Michael @ Powered_By",
        description: "You'll be able to have a voice conversation with Michael (our AI voice agent) directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.",
        buttonText: "Start Voice Chat",
        consent: "By clicking \"Start Voice Chat\", you consent to having a voice conversation with RightBloom's sales team. You can end the conversation at any time."
      };
    } else if (source === 'voice-business') {
      return {
        title: "Good choice!",
        description: "You're one step closer to implementing AI Receptionist for your business lines.",
        buttonText: "Start AI Receptionist Demo",
        consent: "By clicking \"Start AI Receptionist Demo\", you consent to having a voice conversation with Powered_by's Solutions Team. You can end the conversation at any time."
      };
    } else {
      // Default (home page)
      return {
        title: "Good choice!",
        description: "You're one step closer to implementing AI for your business.",
        buttonText: "Start AI Demo",
        consent: "By clicking \"Start AI Demo\", you consent to having a voice conversation with Powered_by's Solutions Team. You can end the conversation at any time."
      };
    }
  };

  const dialogContent = getDialogContent();

  // Initial dialog before call starts
  if (!isCallActive) {
    return (
      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-[#222222] text-white border-gray-800">
          <DialogHeader className="flex items-start space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src="/lovable-uploads/f9fc929a-db9f-43e0-be73-0da1db8c8a46.png"
                alt="Paul Berman, Chief Technical Evangelist @ Powered_by Agency"
                className="object-cover"
              />
              <AvatarFallback>PB</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-white mb-2">
                {dialogContent.title}
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                {dialogContent.description}
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-sm text-gray-300">
              {dialogContent.consent}
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => handleCloseDialog()}
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleStartCall}
                disabled={isSubmitting}
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
              >
                {isSubmitting ? "Starting..." : dialogContent.buttonText}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Active call dialog
  return (
    <Dialog open={showDialog} onOpenChange={(open) => !open && handleEndCallAndRedirect()}>
      <DialogContent className="bg-black text-white border-gray-800 sm:max-w-md p-6 rounded-xl">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">You are now Connected</h2>
            {/* Removed the manual close button here, since DialogContent already has one */}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20 rounded-full border-2 border-gray-700 shadow-md">
                <AvatarImage 
                  src="/lovable-uploads/d2c09a06-b1ad-4f03-bcc5-6ea523b06f41.png" 
                  alt="Michael from Powered_by Solutions" 
                />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-1 left-1 flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <div className="ml-1 flex space-x-0.5">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-3 w-1 rounded-full ${i === 0 ? 'bg-white' : 'bg-gray-500'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Michael</h3>
              <p className="text-gray-400">Powered_by Solutions</p>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Call in progress</h3>
              <div className="flex items-center text-gray-300">
                <Activity className="w-5 h-5 mr-2" />
                <span>Live</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <p className="text-gray-400">Your microphone</p>
              </div>
              <div className="flex items-center">
                <div className="flex space-x-0.5 mr-2">
                  <div className="h-3 w-1 bg-white rounded-full"></div>
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-3 w-1 rounded-full ${i < 2 ? 'bg-gray-400' : 'bg-gray-600'}`}
                    ></div>
                  ))}
                </div>
                <span className="text-gray-400">Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={toggleMute}
              className="flex-1 py-3 px-4 border border-gray-700 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors text-white"
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span>{isMuted ? "Unmute" : "Mute"}</span>
            </button>
            
            <button 
              onClick={handleEndCall}
              className="flex-1 py-3 px-4 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
              <span>End Call</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

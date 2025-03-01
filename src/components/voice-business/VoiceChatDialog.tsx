
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
}

export const VoiceChatDialog = ({
  showDialog,
  isCallActive,
  isSubmitting,
  handleCloseDialog,
  handleStartCall,
  handleEndCall,
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

  // Initial dialog before call starts
  if (!isCallActive) {
    return (
      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-[#222222] text-white border-gray-800">
          <DialogHeader className="flex items-start space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src="/lovable-uploads/8c4d903b-42b2-48ef-9625-676d1f6aa106.png"
                alt="Paul Berman, Chief Technical Evangelist @ Powered_by Agency"
                className="object-cover"
              />
              <AvatarFallback>PB</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-white mb-2">
                Experience Our AI Phone Receptionist Demo with Paul Berman
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                You'll be able to have a voice conversation with Paul directly through your browser to experience the AI phone receptionist. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-sm text-gray-300">
              By clicking "Start AI Receptionist Demo", you consent to having a voice conversation with Powered_by's Solutions Team. You can end the conversation at any time.
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
                {isSubmitting ? "Starting..." : "Start AI Receptionist Demo"}
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
            <h2 className="text-3xl font-bold text-white">You are now connected with Paul Berman</h2>
            {/* Close button is already provided by DialogContent */}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20 rounded-full border-2 border-gray-700 shadow-md">
                <AvatarImage 
                  src="/lovable-uploads/8c4d903b-42b2-48ef-9625-676d1f6aa106.png" 
                  alt="Paul Berman, Chief Technical Evangelist" 
                  className="object-cover"
                />
                <AvatarFallback>PB</AvatarFallback>
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
              <h3 className="text-2xl font-bold text-white">Paul Berman</h3>
              <p className="text-gray-400">Chief Technical Evangelist @ Powered_by</p>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">AI Receptionist Demo in Progress</h3>
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
              onClick={handleEndCallAndRedirect}
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


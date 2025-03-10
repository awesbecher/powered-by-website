
import { DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Activity, Mic, MicOff, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ActiveCallDialogProps {
  handleEndCall: () => void;
}

export const ActiveCallDialog = ({ handleEndCall }: ActiveCallDialogProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();

  const toggleMute = () => {
    // In a real implementation, this would interact with the Vapi SDK to mute/unmute
    setIsMuted(!isMuted);
  };

  const handleEndCallAndNavigate = () => {
    handleEndCall();
    navigate('/voice-chat');
  };

  return (
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
                src="/lovable-uploads/4bf8609b-100b-47bc-83ab-a1a376a57c4d.png" 
                alt="Michael from Powered_by Solutions" 
              />
              <AvatarFallback>MB</AvatarFallback>
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
            onClick={handleEndCallAndNavigate}
            className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center space-x-2 transition-colors"
          >
            <X className="w-5 h-5" />
            <span>End Call</span>
          </button>
        </div>
      </div>
    </DialogContent>
  );
};

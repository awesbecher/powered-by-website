
import { DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Activity, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, MutableRefObject } from "react";

interface ActiveCallDialogProps {
  handleEndCall: () => void;
  isUnmountingRef?: MutableRefObject<boolean>;
}

export const ActiveCallDialog = ({ handleEndCall, isUnmountingRef }: ActiveCallDialogProps) => {
  const navigate = useNavigate();

  const handleEndCallAndNavigate = () => {
    handleEndCall();
    navigate('/contact');
  };

  // We're removing the automatic call ending on unmount to prevent
  // premature call termination. The call should only end when
  // explicitly requested by the user or the agent.

  return (
    <DialogContent className="bg-black text-white border-gray-800 sm:max-w-md p-6 rounded-xl">
      <div className="flex flex-col space-y-6">
        <h2 className="text-4xl font-bold text-white mb-2">You are now Connected</h2>
        
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="h-20 w-20 rounded-full">
              <AvatarImage 
                src="/lovable-uploads/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png" 
                alt="Michael from Powered_by Solutions" 
                className="object-cover"
              />
              <AvatarFallback>MB</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 left-1">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-3xl font-bold text-white">Michael</h3>
            <p className="text-gray-400">Powered_by Solutions</p>
          </div>
        </div>
        
        <div className="bg-[#1e2a3b] p-4 rounded-xl">
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
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-3 w-1 bg-white rounded-full"
                  ></div>
                ))}
              </div>
              <span className="text-gray-400">Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={handleEndCallAndNavigate}
            className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center space-x-2 transition-colors"
          >
            <X className="w-5 h-5 mr-2" />
            <span>End Call</span>
          </button>
        </div>
      </div>
    </DialogContent>
  );
};

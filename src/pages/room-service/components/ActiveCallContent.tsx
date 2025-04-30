
import React, { useEffect } from "react";
import { X, Activity } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ActiveCallContentProps {
  handleEndCall: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

export const ActiveCallContent: React.FC<ActiveCallContentProps> = ({
  handleEndCall,
  isMuted,
  toggleMute,
}) => {
  // Add cleanup effect that ends the call when component unmounts
  useEffect(() => {
    return () => {
      handleEndCall();
    };
  }, [handleEndCall]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">You are now Connected</h2>
        <button onClick={handleEndCall} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="h-20 w-20 rounded-full border-2 border-white shadow-md">
            <AvatarImage src="/assets/images/ec9dd264-4bb3-4b03-9b50-e31383652af9.png" alt="Grandview Room Service" />
            <AvatarFallback>GV</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 left-1 flex items-center">
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            <div className="ml-1 flex space-x-0.5">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-3 w-1 rounded-full ${i === 0 ? 'bg-gray-800' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Room Service</h3>
          <p className="text-gray-500">Grandview Hotel</p>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Call in progress</h3>
          <div className="flex items-center text-gray-700">
            <Activity className="w-5 h-5 mr-2" />
            <span>Live</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="text-gray-600">Your microphone</p>
          </div>
          <div className="flex items-center">
            <div className="flex space-x-0.5 mr-2">
              <div className="h-3 w-1 bg-black rounded-full"></div>
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-3 w-1 rounded-full ${i < 2 ? 'bg-gray-400' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
            <span className="text-gray-600">Active</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={handleEndCall}
          className="w-full py-3 px-4 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
        >
          <X className="w-5 h-5 mr-2" />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
};

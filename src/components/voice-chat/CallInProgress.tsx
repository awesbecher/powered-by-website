
import React, { useEffect, MutableRefObject } from "react";
import { X, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CallInProgressProps {
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  onRestart: () => void;
  isSimulation?: boolean; // Add this prop to determine if this is in the simulation or real UI
  isUnmountingRef?: MutableRefObject<boolean>;
}

export const CallInProgress = ({ 
  isMuted, 
  setIsMuted, 
  onRestart, 
  isSimulation = false,
  isUnmountingRef
}: CallInProgressProps) => {
  const navigate = useNavigate();
  
  // Add cleanup effect that ends the call when component unmounts
  // but only if it's a real page navigation, not during dialog interactions
  useEffect(() => {
    return () => {
      if (!isUnmountingRef || isUnmountingRef.current) {
        onRestart();
      }
    };
  }, [onRestart, isUnmountingRef]);
  
  const handleEndCall = () => {
    // First call the original restart function
    onRestart();
    
    // Then navigate to the contact page if not in simulation
    if (!isSimulation) {
      navigate('/contact');
    }
  };

  return (
    <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
      <div className="bg-black rounded-xl shadow-xl max-w-[300px] w-full p-4 m-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-white">
            {isSimulation 
              ? "You are now connected with Stephanie Tolson" 
              : "You are now connected with Paul Berman"}
          </h2>
          <button onClick={handleEndCall} className="text-gray-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-700 shadow-md">
              {isSimulation ? (
                <img 
                  src="/lovable-uploads/7fafe6a4-b6c1-4526-9310-a32650aec834.png" 
                  alt="Stephanie Tolson" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src="/lovable-uploads/4bf8609b-100b-47bc-83ab-a1a376a57c4d.png" 
                  alt="Paul Berman" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute bottom-0 left-0 flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="ml-0.5 flex space-x-0.5">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 w-0.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-gray-500'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {isSimulation ? "Stephanie Tolson" : "Paul Berman"}
            </h3>
            <p className="text-sm text-gray-400">
              {isSimulation ? "Senior Realtor" : "Chief Technical Evangelist @ Powered_by"}
            </p>
          </div>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-lg mb-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-white">Call in progress</h3>
            <div className="flex items-center text-gray-300">
              <Activity className="w-3 h-3 mr-1" />
              <span className="text-xs">Live</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">Your microphone</p>
            <div className="flex items-center">
              <div className="flex space-x-0.5 mr-2">
                <div className="h-2 w-0.5 bg-white rounded-full"></div>
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 w-0.5 rounded-full ${i < 2 ? 'bg-gray-400' : 'bg-gray-600'}`}
                  ></div>
                ))}
              </div>
              <span className="text-gray-300 text-xs">Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={handleEndCall}
            className="w-full py-2 px-3 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors text-sm"
          >
            <X className="w-3 h-3 mr-1" />
            <span>End Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};

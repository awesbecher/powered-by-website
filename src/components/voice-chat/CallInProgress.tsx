
import React from "react";
import { X, Mic, MicOff, Activity } from "lucide-react";

interface CallInProgressProps {
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  onRestart: () => void;
}

export const CallInProgress = ({ isMuted, setIsMuted, onRestart }: CallInProgressProps) => {
  return (
    <div className="bg-white min-h-[600px] max-h-[600px] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-black rounded-xl shadow-xl max-w-md w-full p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-bold text-white">You are now Connected</h2>
            <button onClick={onRestart} className="text-gray-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3 mb-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-700 shadow-md">
                <img 
                  src="/lovable-uploads/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png" 
                  alt="Melissa Thomas" 
                  className="w-full h-full object-cover"
                />
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
              <h3 className="text-base font-bold text-white">Melissa Thomas</h3>
              <p className="text-sm text-gray-400">Phoenix Realty Inc.</p>
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
          
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="flex-1 py-2 px-3 border border-gray-600 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors text-white text-sm"
            >
              {isMuted ? <MicOff className="w-3 h-3 mr-1" /> : <Mic className="w-3 h-3 mr-1" />}
              <span>{isMuted ? "Unmute" : "Mute"}</span>
            </button>
            
            <button 
              onClick={onRestart}
              className="flex-1 py-2 px-3 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors text-sm"
            >
              <X className="w-3 h-3 mr-1" />
              <span>End Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

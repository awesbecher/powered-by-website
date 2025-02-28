
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, X, Activity } from "lucide-react";
import { properties } from "@/data/properties";

export const WebsiteSimulation = () => {
  const [simState, setSimState] = useState<"website" | "loading" | "call">("website");
  const [isMuted, setIsMuted] = useState(false);

  // Auto progress simulation for demo purposes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (simState === "loading") {
      timer = setTimeout(() => {
        setSimState("call");
      }, 1500); // Show loading for 1.5 seconds
    }
    
    return () => clearTimeout(timer);
  }, [simState]);

  const handleStartCall = () => {
    setSimState("loading");
  };

  const handleRestart = () => {
    setSimState("website");
    setIsMuted(false);
  };

  // Get the first 4 properties from our data
  const displayProperties = properties.slice(0, 4);

  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      {/* Monitor frame with purple glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-[#9b87f5] rounded-xl blur-lg opacity-75"></div>
      <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800">
        {/* Simulated website header */}
        <div className="bg-white p-2 flex justify-between items-center border-b">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-500 flex-1 mx-4 text-center">
            www.phxrealtyinc.com
          </div>
          <div className="w-4"></div>
        </div>

        {/* Website Content */}
        {simState === "website" && (
          <div className="p-4 bg-white min-h-[500px]">
            {/* Logo at top left */}
            <div className="mb-6">
              <img 
                src="/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png" 
                alt="Phoenix Realty Inc. Logo" 
                className="h-16 mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800">Find Your Dream Home</h2>
              <p className="text-gray-600 mt-2">Discover beautiful properties that match your lifestyle</p>
            </div>
            
            {/* Property cards with real images */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {displayProperties.map((property, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-2 shadow-sm">
                  <div className="h-24 rounded-md mb-2 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs font-semibold text-gray-800 truncate">{property.price}</div>
                  <div className="text-xs text-gray-600 truncate">{property.location}</div>
                </div>
              ))}
            </div>
            
            {/* Call to action button */}
            <div className="mt-4 flex justify-center">
              <Button 
                onClick={handleStartCall} 
                className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-4 py-2 rounded-md"
              >
                <Mic className="w-4 h-4 mr-2" /> Speak to a Real Estate Agent Now
              </Button>
            </div>
          </div>
        )}

        {/* Loading state */}
        {simState === "loading" && (
          <div className="p-6 bg-white min-h-[500px] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#9b87f5]"></div>
            <p className="mt-4 text-gray-600">Connecting to an agent...</p>
          </div>
        )}

        {/* Call in progress state */}
        {simState === "call" && (
          <div className="bg-white min-h-[500px] flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="bg-black rounded-2xl shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">You are now Connected</h2>
                  <button onClick={handleRestart} className="text-gray-300 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-gray-700 shadow-md">
                      <img 
                        src="/lovable-uploads/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png" 
                        alt="Melissa Thomas" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                      <div className="ml-1 flex space-x-0.5">
                        {[...Array(4)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-2 w-1 rounded-full ${i === 0 ? 'bg-white' : 'bg-gray-500'}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Melissa Thomas</h3>
                    <p className="text-gray-400">Phoenix Realty Inc.</p>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-xl mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-white">Call in progress</h3>
                    <div className="flex items-center text-gray-300">
                      <Activity className="w-4 h-4 mr-1" />
                      <span className="text-sm">Live</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Your microphone</p>
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
                      <span className="text-gray-300 text-sm">Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex-1 py-2 px-4 border border-gray-600 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors text-white"
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isMuted ? "Unmute" : "Mute"}</span>
                  </button>
                  
                  <button 
                    onClick={handleRestart}
                    className="flex-1 py-2 px-4 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>End Call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

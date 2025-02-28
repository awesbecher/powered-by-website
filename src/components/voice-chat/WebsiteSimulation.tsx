
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, X, Activity } from "lucide-react";
import { properties } from "@/data/properties";

// Helper function to preload images
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
};

export const WebsiteSimulation = () => {
  const [simState, setSimState] = useState<"website" | "loading" | "call">("website");
  const [isMuted, setIsMuted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images when component mounts
  useEffect(() => {
    const preloadImages = async () => {
      try {
        // Get the first 4 properties for preloading
        const displayProperties = properties.slice(0, 4);
        
        // Preload all property images and agent image
        await Promise.all([
          ...displayProperties.map(property => preloadImage(property.image)),
          preloadImage("/lovable-uploads/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png"), // Agent image
          preloadImage("/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png")  // Logo
        ]);
        
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to preload images:", error);
        // Still set as loaded if there's an error to avoid blocking the UI
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

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
    <div className="relative w-full max-w-[420px] mx-auto">
      {/* Monitor frame with purple glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-[#9b87f5] rounded-xl blur-lg opacity-75"></div>
      <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800">
        {/* Simulated website header */}
        <div className="bg-white p-2 flex justify-between items-center border-b">
          <div className="flex space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-500 flex-1 mx-4 text-center">
            www.phxrealtyinc.com
          </div>
          <div className="w-4"></div>
        </div>

        {/* Website Content */}
        {simState === "website" && (
          <div className="p-4 bg-white min-h-[600px] max-h-[600px] overflow-hidden">
            {/* Logo at top left */}
            <div className="mb-3">
              <img 
                src="/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png" 
                alt="Phoenix Realty Inc. Logo" 
                className="h-10 mb-2"
              />
              <h2 className="text-xl font-bold text-gray-800">Find Your Dream Home</h2>
              <p className="text-sm text-gray-600">Discover beautiful properties that match your lifestyle</p>
            </div>
            
            {/* Property cards with real images */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {displayProperties.map((property, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-2 shadow-sm">
                  <div className="h-24 rounded-md mb-2 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-semibold text-gray-800 truncate">{property.price}</div>
                  <div className="text-xs text-gray-600 truncate">{property.location}</div>
                </div>
              ))}
            </div>
            
            {/* Call to action button */}
            <div className="mt-3 flex justify-center">
              <Button 
                onClick={handleStartCall} 
                className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-3 py-2 rounded-md text-sm"
              >
                <Mic className="w-4 h-4 mr-2" /> Speak to a Real Estate Agent Now
              </Button>
            </div>
          </div>
        )}

        {/* Loading state */}
        {simState === "loading" && (
          <div className="p-4 bg-white min-h-[600px] max-h-[600px] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9b87f5]"></div>
            <p className="mt-4 text-base text-gray-600">Connecting to an agent...</p>
          </div>
        )}

        {/* Call in progress state */}
        {simState === "call" && (
          <div className="bg-white min-h-[600px] max-h-[600px] flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="bg-black rounded-xl shadow-xl max-w-md w-full p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-base font-bold text-white">You are now Connected</h2>
                  <button onClick={handleRestart} className="text-gray-300 hover:text-white">
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
                    onClick={handleRestart}
                    className="flex-1 py-2 px-3 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors text-sm"
                  >
                    <X className="w-3 h-3 mr-1" />
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

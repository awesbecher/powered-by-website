
import { useState, useEffect } from "react";
import { WebsiteHeader } from "./WebsiteHeader";
import { WebsiteContent } from "./WebsiteContent";
import { LoadingState } from "./LoadingState";
import { CallInProgress } from "./CallInProgress";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { useCursorAnimation } from "./hooks/useCursorAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Settings, FastForward, PauseCircle, PlayCircle } from "lucide-react";
import "./CursorAnimation.css";

export const WebsiteSimulation = () => {
  const [simState, setSimState] = useState<"website" | "loading" | "call">("website");
  const [isMuted, setIsMuted] = useState(false);
  const [autoSimulate, setAutoSimulate] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState<string>("2s");
  
  // Check if on mobile device
  const isMobile = useIsMobile();
  
  // Use our custom hooks
  const imagesLoaded = useImagePreloader();
  const { cursorRef } = useCursorAnimation(simState, setSimState, autoSimulate, imagesLoaded, animationSpeed);
  
  // Handle manual state transitions
  const handleStartCall = () => {
    setSimState("loading");
  };

  const handleRestart = () => {
    setSimState("website");
    setIsMuted(false);
  };

  // Toggle simulation
  const toggleSimulation = () => {
    setAutoSimulate(!autoSimulate);
  };

  // Update animation speed
  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnimationSpeed(e.target.value);
  };

  return (
    <div className="relative w-full max-w-[380px] mx-auto">
      {/* Monitor frame with purple glow */}
      <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 to-[#9b87f5] rounded-xl blur-lg opacity-75"></div>
      <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800">
        {/* Simulated website header */}
        <WebsiteHeader />

        {/* Website Content */}
        {simState === "website" && <WebsiteContent onStartCall={handleStartCall} autoSimulate={autoSimulate} />}

        {/* Loading state */}
        {simState === "loading" && <LoadingState />}

        {/* Call in progress state */}
        {simState === "call" && (
          <CallInProgress 
            isMuted={isMuted} 
            setIsMuted={setIsMuted} 
            onRestart={handleRestart} 
          />
        )}

        {/* Animation controls */}
        <div className="absolute bottom-2 right-2 flex items-center gap-2 z-50">
          <button 
            onClick={() => setShowControls(!showControls)} 
            className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 text-white"
            aria-label="Animation settings"
          >
            <Settings size={16} />
          </button>
          <button 
            onClick={toggleSimulation} 
            className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 text-white"
            aria-label={autoSimulate ? "Pause animation" : "Play animation"}
          >
            {autoSimulate ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
          </button>
        </div>

        {/* Animation speed controls */}
        {showControls && (
          <div className="absolute bottom-12 right-2 bg-gray-800 rounded-md p-2 text-white text-xs z-50">
            <div className="flex flex-col gap-1">
              <label htmlFor="animation-speed" className="font-medium">
                Animation Speed:
              </label>
              <select 
                id="animation-speed" 
                value={animationSpeed}
                onChange={handleSpeedChange}
                className="bg-gray-700 rounded p-1 text-xs"
              >
                <option value="3s">Slow</option>
                <option value="2s">Normal</option>
                <option value="1s">Fast</option>
                <option value="0.5s">Very Fast</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Responsive design indicator - only shown in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-0 left-0 bg-black text-white text-xs p-1 z-50">
          <span className="sm:hidden">XS</span>
          <span className="hidden sm:inline md:hidden">SM</span>
          <span className="hidden md:inline lg:hidden">MD</span>
          <span className="hidden lg:inline xl:hidden">LG</span>
          <span className="hidden xl:inline 2xl:hidden">XL</span>
          <span className="hidden 2xl:inline">2XL</span>
        </div>
      )}

      {/* Responsive instructions for small devices */}
      {isMobile && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          <p>For the best experience with the animation, please view on a larger screen.</p>
        </div>
      )}
    </div>
  );
};

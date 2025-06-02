
import { useState, useEffect } from "react";
import { WebsiteHeader } from "./WebsiteHeader";
import { WebsiteContent } from "./WebsiteContent";
import { LoadingState } from "@/components/voice-chat/LoadingState";
import { CallInProgress } from "@/components/voice-chat/CallInProgress";
import { useImagePreloader } from "@/components/voice-chat/hooks/useImagePreloader";
import { useCursorAnimation } from "@/components/voice-chat/hooks/useCursorAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import { properties } from "@/data/properties";
import { forcePrefetchImages, addCSSImagePreloading } from "@/components/voice-chat/utils/imageUtils";
import "@/components/voice-chat/CursorAnimation.css";
import "./ServiceBoxes.css";

// Immediately preload all images when this module is imported
// This runs before the component is even mounted
const propertyImages = properties.map(property => property.image);
forcePrefetchImages(propertyImages);
addCSSImagePreloading(propertyImages);

export const WebsiteSimulation = () => {
  const [simState, setSimState] = useState<"website" | "loading" | "call">("website");
  const [isMuted, setIsMuted] = useState(false);
  const [initialRender, setInitialRender] = useState(false); // Skip initial render animation
  const animationSpeed = "2s"; // Fixed animation speed
  
  // Check if on mobile device
  const isMobile = useIsMobile();
  
  // Set images as already loaded
  const [imagesLoaded, setImagesLoaded] = useState(true);
  
  // Skip initial render
  useEffect(() => {
    setInitialRender(false);
    setImagesLoaded(true);
  }, []);
  
  // Use our custom hooks with predetermined loaded state
  const { cursorRef } = useCursorAnimation(simState, setSimState, true, true, animationSpeed);

  // Handle manual state transitions
  const handleStartCall = () => {
    setSimState("loading");
  };

  const handleRestart = () => {
    setSimState("website");
    setIsMuted(false);
  };

  return (
    <div className="relative w-full max-w-[380px] mx-auto">
      {/* Animated glow effect */}
      <div className="absolute -inset-3 bg-gradient-to-r from-[#7100ff] to-[#9b87f5] rounded-xl blur-lg opacity-75 animate-pulse"></div>
      
      {/* Hovering effect */}
      <div className="relative transform hover:-translate-y-1 transition-transform duration-300">
        <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          {/* Device frame */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7100ff]/20 via-[#9b87f5]/40 to-[#7100ff]/20"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7100ff]/20 via-[#9b87f5]/40 to-[#7100ff]/20"></div>
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[#7100ff]/20 via-[#9b87f5]/40 to-[#7100ff]/20"></div>
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-[#7100ff]/20 via-[#9b87f5]/40 to-[#7100ff]/20"></div>
          </div>

          {/* Simulated website header */}
          <WebsiteHeader />

          {/* Website Content */}
          {simState === "website" && <WebsiteContent onStartCall={handleStartCall} autoSimulate={true} />}

          {/* Loading state */}
          {simState === "loading" && <LoadingState />}

          {/* Website content in background when call is active */}
          {simState === "call" && (
            <div className="relative min-h-[500px] max-h-[500px]">
              <WebsiteContent onStartCall={() => {}} autoSimulate={false} />
              
              {/* Call overlay - now with isSimulation prop */}
              <CallInProgress 
                isMuted={isMuted} 
                setIsMuted={setIsMuted} 
                onRestart={handleRestart}
                isSimulation={true}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Responsive instructions for small devices */}
      {isMobile && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          <p>For the best experience with the animation, please view on a larger screen.</p>
        </div>
      )}
    </div>
  );
};


import { useState, useEffect } from "react";
import { WebsiteHeader } from "./WebsiteHeader";
import { WebsiteContent } from "./WebsiteContent";
import { LoadingState } from "./LoadingState";
import { CallInProgress } from "./CallInProgress";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { useCursorAnimation } from "./hooks/useCursorAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import { properties } from "@/data/properties";
import { forcePrefetchImages, addCSSImagePreloading } from "./utils/imageUtils";
import "./CursorAnimation.css";

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
      {/* Monitor frame with purple glow */}
      <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 to-[#9b87f5] rounded-xl blur-lg opacity-75"></div>
      <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800">
        {/* Simulated website header */}
        <WebsiteHeader />

        {/* Website Content */}
        {simState === "website" && <WebsiteContent onStartCall={handleStartCall} autoSimulate={true} />}

        {/* Loading state */}
        {simState === "loading" && <LoadingState />}

        {/* Website content in background when call is active */}
        {simState === "call" && (
          <div className="relative min-h-[600px] max-h-[600px]">
            <WebsiteContent onStartCall={() => {}} autoSimulate={false} />
            
            {/* Call overlay */}
            <CallInProgress 
              isMuted={isMuted} 
              setIsMuted={setIsMuted} 
              onRestart={handleRestart} 
            />
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

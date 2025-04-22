import React from 'react';
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
const headerImages = [
  "/lovable-uploads/64bb9d7d-aaaa-4015-9a4b-839ae9f0114d.png", // PBA logo
];
const allImagesToPreload = [...propertyImages, ...headerImages];
forcePrefetchImages(allImagesToPreload);
addCSSImagePreloading(allImagesToPreload);

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
      
      {/* Responsive instructions for small devices */}
      {isMobile && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          <p>For the best experience with the animation, please view on a larger screen.</p>
        </div>
      )}
    </div>
  );
};

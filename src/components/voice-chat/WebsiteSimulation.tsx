
import { useState, useEffect } from "react";
import { properties } from "@/data/properties";
import { preloadImage } from "./utils/imageUtils";
import { WebsiteHeader } from "./WebsiteHeader";
import { WebsiteContent } from "./WebsiteContent";
import { LoadingState } from "./LoadingState";
import { CallInProgress } from "./CallInProgress";

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

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      {/* Monitor frame with purple glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-[#9b87f5] rounded-xl blur-lg opacity-75"></div>
      <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800">
        {/* Simulated website header */}
        <WebsiteHeader />

        {/* Website Content */}
        {simState === "website" && <WebsiteContent onStartCall={handleStartCall} />}

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
      </div>
    </div>
  );
};

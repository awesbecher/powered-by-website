
import { useState, useEffect, useRef } from "react";
import { properties } from "@/data/properties";
import { preloadImage } from "./utils/imageUtils";
import { WebsiteHeader } from "./WebsiteHeader";
import { WebsiteContent } from "./WebsiteContent";
import { LoadingState } from "./LoadingState";
import { CallInProgress } from "./CallInProgress";
import "./CursorAnimation.css";

export const WebsiteSimulation = () => {
  const [simState, setSimState] = useState<"website" | "loading" | "call">("website");
  const [isMuted, setIsMuted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [autoSimulate, setAutoSimulate] = useState(true);
  const simulationCycleRef = useRef<NodeJS.Timeout | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

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

  // Animation logic for cursor
  useEffect(() => {
    if (!autoSimulate) return;

    const cursorElement = document.querySelector(".cursor-simulation") as HTMLElement;
    if (!cursorElement) return;
    
    cursorRef.current = cursorElement;

    // Initial position
    cursorElement.style.top = "100px";
    cursorElement.style.left = "50%";

    // Move cursor to button
    const moveCursorToButton = () => {
      if (simState !== "website") return;
      
      const button = document.getElementById("cta-button");
      if (!button || !cursorElement) return;

      const buttonRect = button.getBoundingClientRect();
      const containerRect = button.parentElement?.getBoundingClientRect();
      
      if (!containerRect) return;
      
      // Calculate relative position within the container
      const targetTop = buttonRect.top - containerRect.top + buttonRect.height / 2;
      const targetLeft = buttonRect.left - containerRect.left + buttonRect.width / 2;

      // Apply animation
      cursorElement.style.transition = "top 1.5s ease-in-out, left 1.5s ease-in-out";
      cursorElement.style.top = `${targetTop}px`;
      cursorElement.style.left = `${targetLeft}px`;
      
      // Add clicking animation
      setTimeout(() => {
        if (cursorElement && simState === "website") {
          cursorElement.classList.add("clicking");
          
          // Remove clicking animation
          setTimeout(() => {
            if (cursorElement) {
              cursorElement.classList.remove("clicking");
            }
          }, 300);
        }
      }, 1600);
    };

    // Start the animation sequence
    const startAnimation = () => {
      if (simState === "website") {
        moveCursorToButton();
      }
    };

    // Start the complete simulation cycle
    const startSimulationCycle = () => {
      // Reset to initial state
      setSimState("website");
      
      // Start cursor animation with delay
      setTimeout(startAnimation, 1000);
    };

    // Set up the simulation cycle
    startSimulationCycle();
    
    // Set up loop for the simulation
    simulationCycleRef.current = setInterval(() => {
      startSimulationCycle();
    }, 12000); // Full cycle takes 12 seconds
    
    return () => {
      if (simulationCycleRef.current) {
        clearInterval(simulationCycleRef.current);
      }
    };
  }, [autoSimulate, imagesLoaded]);

  // Auto progress simulation for demo purposes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (simState === "loading") {
      timer = setTimeout(() => {
        setSimState("call");
      }, 1500); // Show loading for 1.5 seconds
    } else if (simState === "call" && autoSimulate) {
      // Auto restart after showing call for a while
      timer = setTimeout(() => {
        setSimState("website");
      }, 5000); // Show call for 5 seconds before restarting
    }
    
    return () => clearTimeout(timer);
  }, [simState, autoSimulate]);

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
      </div>
    </div>
  );
};

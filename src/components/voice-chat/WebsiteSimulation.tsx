
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
    if (!autoSimulate || !imagesLoaded) return;

    // Function to move cursor to the button
    const animateCursor = () => {
      // Use type assertion to fix the TypeScript error
      const cursorElement = document.querySelector(".cursor-simulation") as HTMLDivElement | null;
      if (!cursorElement) return;
      
      // Store reference to cursor
      cursorRef.current = cursorElement;

      // Reset cursor position first
      cursorElement.style.transition = "none";
      cursorElement.style.top = "100px";
      cursorElement.style.left = "50%";
      
      // Force reflow to make sure the reset takes effect
      void cursorElement.offsetWidth;
      
      // Get the CTA button
      setTimeout(() => {
        const button = document.getElementById("cta-button");
        if (!button || !cursorElement) return;
        
        const buttonRect = button.getBoundingClientRect();
        const contentContainer = button.closest(".bg-white");
        
        if (!contentContainer) return;
        
        const containerRect = contentContainer.getBoundingClientRect();
        
        // Calculate relative position within the container
        const targetTop = buttonRect.top - containerRect.top + buttonRect.height / 2;
        const targetLeft = buttonRect.left - containerRect.left + buttonRect.width / 2;
        
        // Apply animation with delay
        cursorElement.style.transition = "top 1.5s ease-in-out, left 1.5s ease-in-out";
        cursorElement.style.top = `${targetTop}px`;
        cursorElement.style.left = `${targetLeft}px`;
        
        // Add clicking animation after cursor arrives
        setTimeout(() => {
          if (cursorElement && simState === "website") {
            cursorElement.classList.add("clicking");
            
            // Remove clicking animation after a short delay
            setTimeout(() => {
              if (cursorElement) {
                cursorElement.classList.remove("clicking");
              }
              
              // Trigger the call after click animation
              setSimState("loading");
            }, 300);
          }
        }, 1600);
      }, 500); // Short delay to ensure DOM is ready
    };

    // Function to move cursor to the call popup center first, then to the end call button
    const animateCursorToCallPopup = () => {
      if (simState !== "call") return;
      
      const cursorElement = document.querySelector(".cursor-simulation") as HTMLDivElement | null;
      if (!cursorElement) return;
      
      // Get the call popup container
      setTimeout(() => {
        const callContainer = document.querySelector(".bg-white .bg-black");
        if (!callContainer || !cursorElement) return;
        
        const callRect = callContainer.getBoundingClientRect();
        const pageContainer = callContainer.closest(".bg-white");
        
        if (!pageContainer) return;
        
        const containerRect = pageContainer.getBoundingClientRect();
        
        // Calculate center of the call popup
        const targetTop = callRect.top - containerRect.top + callRect.height / 2;
        const targetLeft = callRect.left - containerRect.left + callRect.width / 2;
        
        // Apply animation to center of popup first
        cursorElement.style.transition = "top 1s ease-in-out, left 1s ease-in-out";
        cursorElement.style.top = `${targetTop}px`;
        cursorElement.style.left = `${targetLeft}px`;
        
        // After moving to center, move to the End Call button
        setTimeout(() => {
          const endCallButton = document.querySelector(".bg-red-500");
          if (!endCallButton || !cursorElement) return;
          
          const buttonRect = endCallButton.getBoundingClientRect();
          
          // Calculate position of end call button relative to container
          const buttonTop = buttonRect.top - containerRect.top + buttonRect.height / 2;
          const buttonLeft = buttonRect.left - containerRect.left + buttonRect.width / 2;
          
          // Animate cursor to end call button
          cursorElement.style.transition = "top 1.2s ease-in-out, left 1.2s ease-in-out";
          cursorElement.style.top = `${buttonTop}px`;
          cursorElement.style.left = `${buttonLeft}px`;
        }, 1500); // Wait 1.5s before moving to end call button
      }, 500);
    };

    // Start the complete simulation cycle
    const startSimulationCycle = () => {
      // Reset to initial state
      setSimState("website");
      
      // Start cursor animation with delay
      setTimeout(animateCursor, 1000);
    };

    // Clear any existing interval
    if (simulationCycleRef.current) {
      clearInterval(simulationCycleRef.current);
    }
    
    // Initial cycle
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
  }, [autoSimulate, imagesLoaded, simState]);

  // Auto progress simulation for demo purposes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (simState === "loading") {
      timer = setTimeout(() => {
        setSimState("call");
      }, 1500); // Show loading for 1.5 seconds
    } else if (simState === "call" && autoSimulate) {
      // Add cursor animation to call popup and end call button
      setTimeout(() => {
        animateCursorToCallPopupAndButton();
      }, 300);
      
      // Auto restart after showing call for a while
      timer = setTimeout(() => {
        setSimState("website");
      }, 7000); // Show call for 7 seconds before restarting
    }
    
    return () => clearTimeout(timer);
  }, [simState, autoSimulate]);

  // Function for animating cursor to call popup and end call button
  const animateCursorToCallPopupAndButton = () => {
    const cursorElement = document.querySelector(".cursor-simulation") as HTMLDivElement | null;
    if (!cursorElement) return;
    
    const callContainer = document.querySelector(".bg-white .bg-black");
    if (!callContainer) return;
    
    const callRect = callContainer.getBoundingClientRect();
    const pageContainer = callContainer.closest(".bg-white");
    
    if (!pageContainer) return;
    
    const containerRect = pageContainer.getBoundingClientRect();
    
    // Calculate center of the call popup
    const targetTop = callRect.top - containerRect.top + callRect.height / 2;
    const targetLeft = callRect.left - containerRect.left + callRect.width / 2;
    
    // Apply animation to center first
    cursorElement.style.transition = "top 1s ease-in-out, left 1s ease-in-out";
    cursorElement.style.top = `${targetTop}px`;
    cursorElement.style.left = `${targetLeft}px`;
    
    // After moving to center, move to the End Call button
    setTimeout(() => {
      const endCallButton = document.querySelector(".bg-red-500");
      if (!endCallButton || !cursorElement) return;
      
      const buttonRect = endCallButton.getBoundingClientRect();
      
      // Calculate position of end call button relative to container
      const buttonTop = buttonRect.top - containerRect.top + buttonRect.height / 2;
      const buttonLeft = buttonRect.left - containerRect.left + buttonRect.width / 2;
      
      // Animate cursor to end call button
      cursorElement.style.transition = "top 1.2s ease-in-out, left 1.2s ease-in-out";
      cursorElement.style.top = `${buttonTop}px`;
      cursorElement.style.left = `${buttonLeft}px`;
    }, 1500); // Wait 1.5s before moving to end call button
  };

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

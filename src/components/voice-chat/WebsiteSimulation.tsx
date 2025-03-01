
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

    // Full animation sequence
    const runAnimation = () => {
      // Reset state first
      setSimState("website");
      
      // Initialize cursor at the top of the page
      const cursorElement = document.querySelector(".cursor-simulation") as HTMLDivElement | null;
      if (!cursorElement) return;
      
      // Store reference to cursor
      cursorRef.current = cursorElement;
      
      // Reset cursor position to top
      cursorElement.style.transition = "none";
      cursorElement.style.top = "30px";
      cursorElement.style.left = "50%";
      
      // Force reflow
      void cursorElement.offsetWidth;
      
      // First move down to the button with a delay
      setTimeout(() => {
        if (!cursorElement) return;
        
        const button = document.getElementById("cta-button");
        if (!button) return;
        
        const buttonRect = button.getBoundingClientRect();
        const contentContainer = button.closest(".bg-white");
        
        if (!contentContainer) return;
        
        const containerRect = contentContainer.getBoundingClientRect();
        
        // Calculate button position
        const targetTop = buttonRect.top - containerRect.top + buttonRect.height / 2;
        const targetLeft = buttonRect.left - containerRect.left + buttonRect.width / 2;
        
        // Animate cursor to button
        cursorElement.style.transition = "top 2s ease-in-out, left 2s ease-in-out";
        cursorElement.style.top = `${targetTop}px`;
        cursorElement.style.left = `${targetLeft}px`;
        
        // Add clicking animation after cursor arrives at button
        setTimeout(() => {
          if (cursorElement) {
            cursorElement.classList.add("clicking");
            
            // Remove clicking class after animation completes
            setTimeout(() => {
              if (cursorElement) {
                cursorElement.classList.remove("clicking");
              }
            }, 300);
          }
          
          // State transitions will be handled by the click handler in WebsiteContent
        }, 2200); // Wait for cursor to arrive at button
      }, 500);
    };

    // Auto progress simulation for demo purposes
    const handleStateTransitions = () => {
      // When in loading state, transition to call after a delay
      if (simState === "loading") {
        setTimeout(() => {
          setSimState("call");
          
          // Once in call state, animate cursor to end call button
          setTimeout(() => {
            // Move cursor to call popup center first, then to end call button
            const cursorElement = document.querySelector(".cursor-simulation") as HTMLDivElement | null;
            if (!cursorElement) return;
            
            const callContainer = document.querySelector(".bg-white .bg-black");
            if (!callContainer) return;
            
            const callRect = callContainer.getBoundingClientRect();
            const pageContainer = callContainer.closest(".bg-white");
            
            if (!pageContainer) return;
            
            const containerRect = pageContainer.getBoundingClientRect();
            
            // Calculate center of call popup
            const targetTop = callRect.top - containerRect.top + callRect.height / 2;
            const targetLeft = callRect.left - containerRect.left + callRect.width / 2;
            
            // Animate to center of call popup
            cursorElement.style.transition = "top 1s ease-in-out, left 1s ease-in-out";
            cursorElement.style.top = `${targetTop}px`;
            cursorElement.style.left = `${targetLeft}px`;
            
            // After reaching center, move to end call button
            setTimeout(() => {
              const endCallButton = document.querySelector(".bg-red-500");
              if (!endCallButton || !cursorElement) return;
              
              const buttonRect = endCallButton.getBoundingClientRect();
              
              // Calculate position relative to container
              const buttonTop = buttonRect.top - containerRect.top + buttonRect.height / 2;
              const buttonLeft = buttonRect.left - containerRect.left + buttonRect.width / 2;
              
              // Animate cursor to end call button
              cursorElement.style.transition = "top 1s ease-in-out, left 1s ease-in-out";
              cursorElement.style.top = `${buttonTop}px`;
              cursorElement.style.left = `${buttonLeft}px`;
              
              // Wait at button for a moment, then restart animation
              setTimeout(() => {
                runAnimation();
              }, 2000); // Wait at end call button
            }, 1500); // Time to move from center to button
          }, 500); // Time before starting cursor movement in call state
        }, 1500); // Time in loading state
      }
    };

    // Set up state change listener and start animation
    runAnimation();
    
    // Add effect to handle state transitions
    const stateChangeEffect = () => {
      // Set up a watch on simState
      useEffect(() => {
        handleStateTransitions();
      }, [simState]);
    };
    
    // Execute the state change effect
    stateChangeEffect();
    
    // Clean up function
    return () => {
      if (simulationCycleRef.current) {
        clearTimeout(simulationCycleRef.current);
      }
    };
  }, [autoSimulate, imagesLoaded]);
  
  // Listen for state changes and handle transitions
  useEffect(() => {
    if (simState === "loading") {
      // Transition to call after loading
      const timer = setTimeout(() => {
        setSimState("call");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [simState]);

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

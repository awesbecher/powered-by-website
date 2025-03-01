
import { useState, useEffect, useRef, RefObject } from "react";
import { animateCursorClick, moveCursorToElement, resetCursorPosition } from "../utils/animationUtils";

type SimState = "website" | "loading" | "call";

export const useCursorAnimation = (
  simState: SimState,
  setSimState: (state: SimState) => void,
  autoSimulate: boolean,
  imagesLoaded: boolean,
  animationSpeed: string = "2s" // Default animation speed
) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const simulationCycleRef = useRef<NodeJS.Timeout | null>(null);

  // Animation sequence
  const runAnimation = () => {
    // Reset state first
    setSimState("website");
    
    // Initialize cursor at the top of the page
    const cursorElement = document.querySelector(".cursor-simulation") as HTMLDivElement | null;
    if (!cursorElement) return;
    
    // Store reference to cursor
    cursorRef.current = cursorElement;
    
    // Reset cursor position
    resetCursorPosition(cursorElement);
    
    // Calculate delay based on animation speed
    const speedValue = parseFloat(animationSpeed);
    const baseDelay = 500; // base delay in ms
    const scaledDelay = baseDelay * (2 / speedValue); // Scale delay inversely with speed
    
    // First move down to the button with a delay
    setTimeout(() => {
      const button = document.getElementById("cta-button");
      if (!button || !cursorElement) return;
      
      const contentContainer = button.closest(".bg-white");
      if (!contentContainer) return;
      
      // Move cursor to button
      moveCursorToElement(cursorElement, button, contentContainer as HTMLElement, animationSpeed);
      
      // Add clicking animation after cursor arrives at button
      setTimeout(() => {
        animateCursorClick(cursorElement);
        
        // Trigger button click after animation
        setTimeout(() => {
          setSimState("loading");
        }, 300); // Small delay after click animation
      }, speedValue * 1100); // Wait for cursor to arrive at button
    }, scaledDelay);
  };

  // Handle state transitions for loading and call states
  const handleStateTransitions = () => {
    if (simState === "loading") {
      // Calculate delays based on animation speed
      const speedValue = parseFloat(animationSpeed);
      const loadingDelay = 1500 * (2 / speedValue);
      
      setTimeout(() => {
        setSimState("call");
        
        // Once in call state, animate cursor to end call button
        setTimeout(() => {
          const cursorElement = document.querySelector(".cursor-simulation") as HTMLDivElement | null;
          if (!cursorElement) return;
          
          const endCallButton = document.querySelector(".bg-red-500");
          if (!endCallButton) return;
          
          const callContainer = document.querySelector(".bg-white");
          if (!callContainer) return;
          
          // Move cursor directly to end call button
          moveCursorToElement(
            cursorElement,
            endCallButton as HTMLElement,
            callContainer as HTMLElement,
            animationSpeed
          );
          
          // Wait at the end call button for a moment, then restart animation without clicking
          setTimeout(() => {
            runAnimation();
          }, speedValue * 2000); // Longer pause at the end call button before restarting
        }, 800); // Short delay before moving to end call button
      }, loadingDelay);
    }
  };

  // Main effect for auto simulation
  useEffect(() => {
    if (!autoSimulate || !imagesLoaded) return;
    
    // Start initial animation
    runAnimation();
    
    // Clean up function
    return () => {
      if (simulationCycleRef.current) {
        clearTimeout(simulationCycleRef.current);
      }
    };
  }, [autoSimulate, imagesLoaded]);
  
  // Effect for state transitions
  useEffect(() => {
    if (simState === "loading" && autoSimulate) {
      handleStateTransitions();
    }
  }, [simState, autoSimulate]);

  return {
    cursorRef
  };
};

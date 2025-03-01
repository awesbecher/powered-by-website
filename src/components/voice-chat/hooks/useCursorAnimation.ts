
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
  useEffect(() => {
    if (simState === "loading") {
      // Calculate delays based on animation speed
      const speedValue = parseFloat(animationSpeed);
      const loadingDelay = 1500 * (2 / speedValue);
      
      const loadingTimer = setTimeout(() => {
        setSimState("call");
        
        const callTimer = setTimeout(() => {
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
          
          // Wait for cursor to arrive at end call button, then restart after 15 seconds
          const endCallDelay = speedValue * 1100;
          const restartDelay = 15000; // 15 seconds pause before restarting
          
          const restartTimer = setTimeout(() => {
            runAnimation();
          }, endCallDelay + restartDelay);
          
          // Clean up on unmount or state change
          return () => clearTimeout(restartTimer);
        }, 800); // Short delay before moving to end call button
        
        // Clean up on unmount or state change
        return () => clearTimeout(callTimer);
      }, loadingDelay);
      
      // Clean up on unmount or state change
      return () => clearTimeout(loadingTimer);
    }
  }, [simState, animationSpeed]);
  
  // Initial animation setup
  useEffect(() => {
    if (!imagesLoaded) return;
    
    // Start initial animation with a small delay to ensure everything is ready
    const initialTimer = setTimeout(() => {
      runAnimation();
    }, 300);
    
    // Clean up function
    return () => {
      clearTimeout(initialTimer);
      if (simulationCycleRef.current) {
        clearTimeout(simulationCycleRef.current);
      }
    };
  }, [imagesLoaded]);

  return {
    cursorRef
  };
};

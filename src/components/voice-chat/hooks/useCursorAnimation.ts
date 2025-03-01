
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
      }, speedValue * 1100); // Wait for cursor to arrive at button
    }, scaledDelay);
  };

  // Handle state transitions for loading and call states
  const handleStateTransitions = () => {
    if (simState === "loading") {
      // Calculate delays based on animation speed
      const speedValue = parseFloat(animationSpeed);
      const loadingDelay = 1500 * (2 / speedValue);
      const callInitialDelay = 500 * (2 / speedValue);
      const centerToButtonDelay = 1500 * (2 / speedValue);
      const endCallButtonDelay = 2000 * (2 / speedValue);
      
      setTimeout(() => {
        setSimState("call");
        
        // Once in call state, animate cursor to end call button
        setTimeout(() => {
          const cursorElement = document.querySelector(".cursor-simulation") as HTMLDivElement | null;
          if (!cursorElement) return;
          
          const callContainer = document.querySelector(".bg-white .bg-black");
          if (!callContainer) return;
          
          const pageContainer = callContainer.closest(".bg-white");
          if (!pageContainer) return;
          
          // Animate to center of call popup
          moveCursorToElement(
            cursorElement, 
            callContainer as HTMLElement,
            pageContainer as HTMLElement,
            animationSpeed.replace("s", "") + "s"
          );
          
          // After reaching center, move to end call button
          setTimeout(() => {
            const endCallButton = document.querySelector(".bg-red-500");
            if (!endCallButton || !cursorElement) return;
            
            moveCursorToElement(
              cursorElement,
              endCallButton as HTMLElement,
              pageContainer as HTMLElement,
              animationSpeed.replace("s", "") + "s"
            );
            
            // Wait at button for a moment, then restart animation
            setTimeout(() => {
              runAnimation();
            }, endCallButtonDelay);
          }, centerToButtonDelay);
        }, callInitialDelay);
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

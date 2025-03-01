
import { useState, useEffect, useRef, RefObject } from "react";
import { animateCursorClick, moveCursorToElement, resetCursorPosition } from "../utils/animationUtils";

type SimState = "website" | "loading" | "call";

export const useCursorAnimation = (
  simState: SimState,
  setSimState: (state: SimState) => void,
  autoSimulate: boolean,
  imagesLoaded: boolean
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
    
    // First move down to the button with a delay
    setTimeout(() => {
      const button = document.getElementById("cta-button");
      if (!button || !cursorElement) return;
      
      const contentContainer = button.closest(".bg-white");
      if (!contentContainer) return;
      
      // Move cursor to button
      moveCursorToElement(cursorElement, button, contentContainer as HTMLElement);
      
      // Add clicking animation after cursor arrives at button
      setTimeout(() => {
        animateCursorClick(cursorElement);
      }, 2200); // Wait for cursor to arrive at button
    }, 500);
  };

  // Handle state transitions for loading and call states
  const handleStateTransitions = () => {
    if (simState === "loading") {
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
            "1s"
          );
          
          // After reaching center, move to end call button
          setTimeout(() => {
            const endCallButton = document.querySelector(".bg-red-500");
            if (!endCallButton || !cursorElement) return;
            
            moveCursorToElement(
              cursorElement,
              endCallButton as HTMLElement,
              pageContainer as HTMLElement,
              "1s"
            );
            
            // Wait at button for a moment, then restart animation
            setTimeout(() => {
              runAnimation();
            }, 2000); // Wait at end call button
          }, 1500); // Time to move from center to button
        }, 500); // Time before starting cursor movement in call state
      }, 1500); // Time in loading state
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

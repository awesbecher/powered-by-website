
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
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isAnimatingRef = useRef(false);
  const hasStartedFirstAnimationRef = useRef(false);

  // Clear all pending timeouts to prevent memory leaks
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
  };

  // Helper to add timeout and keep track of it
  const safeSetTimeout = (callback: () => void, delay: number) => {
    const timeout = setTimeout(callback, delay);
    timeoutsRef.current.push(timeout);
    return timeout;
  };

  // Animation sequence
  const runAnimation = () => {
    // Prevent multiple animation cycles running simultaneously
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    
    // Reset state first
    setSimState("website");
    
    // Initialize cursor at the top of the page
    const cursorElement = document.querySelector(".cursor-simulation") as HTMLDivElement | null;
    if (!cursorElement) {
      isAnimatingRef.current = false;
      return;
    }
    
    // Store reference to cursor
    cursorRef.current = cursorElement;
    
    // Reset cursor position
    resetCursorPosition(cursorElement);
    
    // Calculate delay based on animation speed
    const speedValue = parseFloat(animationSpeed);
    const baseDelay = hasStartedFirstAnimationRef.current ? 500 : 100; // Much shorter initial delay
    const scaledDelay = baseDelay * (2 / speedValue); // Scale delay inversely with speed
    
    console.log("Starting animation with delay:", scaledDelay);
    
    // First move down to the button with a delay
    safeSetTimeout(() => {
      const button = document.getElementById("cta-button");
      if (!button || !cursorElement) {
        isAnimatingRef.current = false;
        return;
      }
      
      const contentContainer = button.closest(".bg-white");
      if (!contentContainer) {
        isAnimatingRef.current = false;
        return;
      }
      
      // Move cursor to button
      moveCursorToElement(cursorElement, button, contentContainer as HTMLElement, animationSpeed);
      
      // Add clicking animation after cursor arrives at button
      safeSetTimeout(() => {
        animateCursorClick(cursorElement);
        
        // Trigger button click after animation
        safeSetTimeout(() => {
          setSimState("loading");
          hasStartedFirstAnimationRef.current = true;
        }, 300); // Small delay after click animation
      }, speedValue * 1100); // Wait for cursor to arrive at button
    }, scaledDelay);
  };

  // Complete the animation cycle: handle end-call and restart
  const completeAnimationCycle = () => {
    const cursorElement = cursorRef.current || document.querySelector(".cursor-simulation") as HTMLDivElement | null;
    if (!cursorElement) {
      isAnimatingRef.current = false;
      return;
    }
    
    const endCallButton = document.querySelector(".bg-red-500");
    if (!endCallButton) {
      isAnimatingRef.current = false;
      return;
    }
    
    const callContainer = document.querySelector(".bg-white");
    if (!callContainer) {
      isAnimatingRef.current = false;
      return;
    }
    
    // Move cursor to end call button
    moveCursorToElement(
      cursorElement,
      endCallButton as HTMLElement,
      callContainer as HTMLElement,
      animationSpeed
    );
    
    // Calculate delays
    const speedValue = parseFloat(animationSpeed);
    const cursorMoveDuration = speedValue * 1100;
    
    // Click the end call button after cursor arrives
    safeSetTimeout(() => {
      animateCursorClick(cursorElement);
      
      // End the call after click animation
      safeSetTimeout(() => {
        setSimState("website");
        
        // Pause before restarting the animation loop
        safeSetTimeout(() => {
          isAnimatingRef.current = false;
          console.log("Animation cycle completed, restarting in 15 seconds");
          safeSetTimeout(() => {
            runAnimation();
          }, 15000); // 15 second pause before restarting
        }, 500); // Small delay before resetting animation state
      }, 300); // Small delay after click animation
    }, cursorMoveDuration);
  };

  // Handle state transitions
  useEffect(() => {
    if (simState === "loading") {
      // Calculate delays based on animation speed
      const speedValue = parseFloat(animationSpeed);
      const loadingDelay = 1500 * (2 / speedValue);
      
      safeSetTimeout(() => {
        setSimState("call");
      }, loadingDelay);
    } 
    else if (simState === "call") {
      // Short delay before handling the call completion
      safeSetTimeout(() => {
        completeAnimationCycle();
      }, 2000);
    }
  }, [simState, animationSpeed]);
  
  // Initial animation setup
  useEffect(() => {
    // Only proceed if images are loaded
    if (!imagesLoaded) return;
    
    console.log("Images loaded, preparing to start animation");
    
    // Start animation almost immediately (50ms delay to ensure DOM is ready)
    const initialTimer = safeSetTimeout(() => {
      runAnimation();
    }, 50);
    
    // Clean up function
    return () => {
      clearAllTimeouts();
      isAnimatingRef.current = false;
    };
  }, [imagesLoaded]);

  return {
    cursorRef
  };
};

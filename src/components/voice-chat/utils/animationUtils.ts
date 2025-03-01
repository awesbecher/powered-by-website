
import { RefObject } from "react";

/**
 * Moves the cursor to a target element
 */
export const moveCursorToElement = (
  cursorElement: HTMLDivElement,
  targetElement: HTMLElement,
  containerElement: HTMLElement,
  transitionTime: string = "2s"
) => {
  if (!cursorElement || !targetElement || !containerElement) return;
  
  const targetRect = targetElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();
  
  // Calculate position relative to container
  const targetTop = targetRect.top - containerRect.top + targetRect.height / 2;
  const targetLeft = targetRect.left - containerRect.left + targetRect.width / 2;
  
  // Animate cursor to target
  cursorElement.style.transition = `top ${transitionTime} ease-in-out, left ${transitionTime} ease-in-out`;
  cursorElement.style.top = `${targetTop}px`;
  cursorElement.style.left = `${targetLeft}px`;
  
  return { targetTop, targetLeft };
};

/**
 * Adds click animation to cursor
 */
export const animateCursorClick = (cursorElement: HTMLDivElement, delay: number = 300) => {
  if (!cursorElement) return;
  
  cursorElement.classList.add("clicking");
  
  // Remove clicking class after animation completes
  setTimeout(() => {
    if (cursorElement) {
      cursorElement.classList.remove("clicking");
    }
  }, delay);
};

/**
 * Reset cursor position to the top of the container
 */
export const resetCursorPosition = (cursorElement: HTMLDivElement) => {
  if (!cursorElement) return;
  
  // Reset cursor position to top
  cursorElement.style.transition = "none";
  cursorElement.style.top = "30px";
  cursorElement.style.left = "50%";
  
  // Force reflow
  void cursorElement.offsetWidth;
};

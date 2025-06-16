import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

/**
 * Centralized function to get the Cal API with standardized configuration
 * Using the exact implementation provided
 */
export const getConfiguredCalApi = async () => {
  try {
    const cal = await getCalApi({"namespace":"get-started-today"});
    cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
    return cal;
  } catch (error) {
    console.error("Error initializing Cal.com embed:", error);
    return null;
  }
};

// Standard config string for data-cal-config attribute
export const calendarConfigString = '{"layout":"month_view"}';

// Helper function to open the calendar modal with direct implementation
export const openCalendarModal = async (calLink = "team-powered-by-dfbtbb/get-started-today") => {
  try {
    const cal = await getCalApi({"namespace":"get-started-today"});
    cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
    
    // Create and click a button with proper namespace and configuration
    const tempButton = document.createElement('button');
    tempButton.setAttribute('data-cal-namespace', 'get-started-today');
    tempButton.setAttribute('data-cal-link', calLink);
    tempButton.setAttribute('data-cal-config', calendarConfigString);
    document.body.appendChild(tempButton);
    tempButton.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(tempButton);
    }, 1000);
    
    return true;
  } catch (error) {
    console.error("Error opening calendar modal:", error);
    return false;
  }
};

// React hook for initializing Cal.com in components
export const useCalendarInitialization = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"get-started-today"});
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);
};

// Add TypeScript definitions for Cal.com global object
type CalFunction = Function & {
  ns?: {
    [key: string]: any
  };
  loaded?: boolean;
  q?: any[];
};

declare global {
  interface Window {
    Cal?: CalFunction;
    lintrk?: any;
  }
}

// Function to ensure all Cal buttons have proper attributes and initialization
export const initializeCalButtonsFix = () => {
  useEffect(() => {
    // Global function to fix all cal buttons
    const fixCalButtons = () => {
      // Find all buttons with data-cal-link but no data-cal-namespace
      const buttons = document.querySelectorAll('[data-cal-link]:not([data-cal-namespace])');
      console.log(`Found ${buttons.length} Cal buttons without namespace attributes`);
      
      // Add namespace attribute to each button
      buttons.forEach(button => {
        button.setAttribute('data-cal-namespace', 'get-started-today');
        console.log('Added namespace attribute to Cal button');
      });
      
      // Add click handler to all Cal buttons to ensure they work
      const allCalButtons = document.querySelectorAll('[data-cal-link]');
      allCalButtons.forEach(button => {
        // Only add handler if it doesn't already have one
        if (!button.hasAttribute('data-cal-handled')) {
          button.setAttribute('data-cal-handled', 'true');
          
          // Add click event listener properly
          button.addEventListener('click', async (e) => {
            // Don't trigger default behavior which might interfere
            e.preventDefault();
            
            try {
              // Force Cal to recognize the button
              if (window.Cal && typeof window.Cal === 'function') {
                // Reinitialize Cal just to be safe
                window.Cal('init', 'get-started-today', {origin: 'https://cal.com'});
                
                // Get the cal link and config from the button
                const calLink = button.getAttribute('data-cal-link') || '';
                const configStr = button.getAttribute('data-cal-config') || '{"layout":"month_view"}';
                const config = JSON.parse(configStr);
                
                // Use the documented modal method which is supported
                window.Cal.ns['get-started-today']('modal', {
                  calLink: calLink,
                  config: config
                });
                
                console.log('Cal.com modal opened through modal method');
              } else {
                console.error('Cal.com not found on window object');
              }
            } catch (error) {
              console.error('Error opening Cal.com modal:', error);
            }
          });
        }
      });
    };
    
    // Fix buttons on initial load
    setTimeout(fixCalButtons, 1000);
    
    // Fix buttons whenever DOM changes (for dynamically added buttons)
    const observer = new MutationObserver((mutations) => {
      let shouldFix = false;
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          shouldFix = true;
        }
      });
      
      if (shouldFix) {
        setTimeout(fixCalButtons, 500);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => observer.disconnect();
  }, []);
};


import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

/**
 * Centralized function to get the Cal API with standardized configuration
 * @param customNamespace Optional custom namespace
 * @returns Promise with the initialized Cal API
 */
export const getConfiguredCalApi = async (customNamespace?: string) => {
  const namespace = customNamespace || "get-started-today";
  
  try {
    const cal = await getCalApi({"namespace": namespace});
    if (cal) {
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand": "#292929"},
          "dark": {"cal-brand": "#fafafa"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
      return cal;
    }
    return null;
  } catch (error) {
    console.error("Error initializing Cal.com embed:", error);
    return null;
  }
};

// Standard config string for data-cal-config attribute
export const calendarConfigString = '{"layout":"month_view","theme":"dark"}';

// Helper function to open the calendar modal with fallback options
export const openCalendarModal = async (calLink = "team-powered-by-dfbtbb/get-started-today") => {
  try {
    // Use the direct button click method as the primary approach
    // Find and click a Cal button in the DOM
    const calButton = document.querySelector(`[data-cal-link="${calLink}"]`);
    if (calButton instanceof HTMLElement) {
      console.log(`Cal.com button found for ${calLink}, triggering click`);
      calButton.click();
      return true;
    }
    
    // If no button is found, try to initialize the API anyway
    await getConfiguredCalApi();
    
    // As a last resort, create and click a button
    const tempButton = document.createElement('button');
    tempButton.setAttribute('data-cal-link', calLink);
    tempButton.setAttribute('data-cal-namespace', 'get-started-today');
    tempButton.setAttribute('data-cal-config', calendarConfigString);
    tempButton.style.display = 'none';
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

// For backward compatibility
export const initializeCalendar = getConfiguredCalApi;

// React hook for initializing Cal.com in components
export const useCalendarInitialization = (customNamespace?: string) => {
  useEffect(() => {
    const init = async () => {
      await getConfiguredCalApi(customNamespace);
    };
    
    init();
  }, [customNamespace]);
};

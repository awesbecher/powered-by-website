import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

/**
 * Ensures the Cal.com script is loaded before proceeding
 * @returns Promise that resolves when script is loaded
 */
export const ensureCalendarScriptLoaded = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    // If script already exists, resolve immediately
    if (document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) {
      console.log("Cal.com script already loaded");
      resolve();
      return;
    }
    
    console.log("Loading Cal.com script");
    const script = document.createElement('script');
    script.src = "https://app.cal.com/embed/embed.js";
    script.onload = () => {
      console.log("Cal.com script loaded successfully");
      resolve();
    };
    script.onerror = (error) => {
      console.error("Failed to load Cal.com script:", error);
      reject(error);
    };
    document.head.appendChild(script);
  });
};

// Standard Cal.com configuration for the entire site
export const initializeCalendar = async (customNamespace?: string) => {
  const namespace = customNamespace || "get-started-today";
  
  try {
    // Ensure script is loaded first
    await ensureCalendarScriptLoaded();
    
    const cal = await getCalApi({"namespace": namespace});
    if (cal) {
      cal("ui", {
        "theme": "dark",
        "cssVarsPerTheme": {
          "light": {"cal-brand": "#292929"},
          "dark": {"cal-brand": "#fafafa"}
        },
        "hideEventTypeDetails": false,
        "layout": "column_view"
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
export const calendarConfigString = '{"layout":"column_view","theme":"dark"}';

// Helper function to open the calendar modal with fallback options
export const openCalendarModal = (calLink = "team-powered-by-dfbtbb/get-started-today") => {
  try {
    // First attempt: Use Cal API directly if available
    const cal = (window as any).Cal;
    if (cal) {
      cal("showModal", { 
        calLink: calLink,
        namespace: "get-started-today",
        config: {
          layout: "column_view",
          theme: "dark"
        }
      });
      return true;
    }
    
    // Second attempt: Find and click a Cal button in the DOM
    const calButton = document.querySelector(`[data-cal-link="${calLink}"]`);
    if (calButton instanceof HTMLElement) {
      console.log(`Cal.com button found for ${calLink}, triggering click`);
      calButton.click();
      return true;
    }
    
    console.error(`Failed to open Cal.com modal for ${calLink} - no button or API found`);
    return false;
  } catch (error) {
    console.error("Error opening calendar modal:", error);
    return false;
  }
};

// React hook for initializing Cal.com in components
export const useCalendarInitialization = (customNamespace?: string) => {
  useEffect(() => {
    const init = async () => {
      await initializeCalendar(customNamespace);
    };
    
    init();
  }, [customNamespace]);
};

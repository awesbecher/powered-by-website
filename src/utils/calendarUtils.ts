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


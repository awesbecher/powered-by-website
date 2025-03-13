
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useWebhookSetup = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [webhookSetup, setWebhookSetup] = useState(false);
  const [setupAttempted, setSetupAttempted] = useState(false);
  const [isSettingUpWebhook, setIsSettingUpWebhook] = useState(false);
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const [fullErrorDetails, setFullErrorDetails] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to retry webhook setup
  const retryWebhookSetup = async () => {
    setWebhookError(null);
    setFullErrorDetails(null);
    setIsSettingUpWebhook(true);
    setSetupAttempted(false);
    
    try {
      console.log("Manually triggering webhook setup");
      const { data, error } = await supabase.functions.invoke('calendly-manage-webhook', {
        body: { action: 'setup', debug: true }
      });
      
      console.log("Manual webhook setup response:", data);
      
      // Handle any kind of error - both from the invoke function or from the response body
      if (error) {
        console.error("Manual webhook setup error (invoke error):", error);
        setWebhookError(`Edge Function error: ${error.message}`);
        setFullErrorDetails(JSON.stringify(error, null, 2));
        toast({
          title: "Webhook Setup Error",
          description: `Failed to invoke Edge Function: ${error.message}`,
          variant: "destructive"
        });
      } else if (data?.error || data?.success === false) {
        // Capture errors that come back with a 200 status code
        console.error("Error in manual webhook response:", data);
        
        let errorMessage = data.message || "Unknown error in response";
        setWebhookError(errorMessage);
        setFullErrorDetails(JSON.stringify(data, null, 2));
        
        toast({
          title: "Webhook Setup Error",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        console.log("Manual webhook setup successful:", data);
        setWebhookSetup(true);
        setWebhookError(null);
        setFullErrorDetails(null);
        toast({
          title: "Notifications Enabled",
          description: "Meeting notifications have been successfully set up.",
        });
      }
    } catch (err: any) {
      console.error("Manual webhook setup unexpected error:", err);
      setWebhookError(err.message || "Unexpected error");
      setFullErrorDetails(JSON.stringify(err, null, 2));
      toast({
        title: "Webhook Setup Error",
        description: `Unexpected error: ${err.message || "Please check console logs for details"}`,
        variant: "destructive"
      });
    } finally {
      setIsSettingUpWebhook(false);
      setSetupAttempted(true);
    }
  };

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
    
    // Clear previous error states
    setWebhookError(null);
    setFullErrorDetails(null);
    
    // Reset webhook setup state - this ensures a fresh setup attempt with the current API key
    setWebhookSetup(false);
    setSetupAttempted(false);
    
    // Setup Calendly webhook
    const setupWebhook = async () => {
      if (!webhookSetup && !setupAttempted && !isSettingUpWebhook) {
        setIsSettingUpWebhook(true);
        console.log("Attempting to set up Calendly webhook with API key");
        
        try {
          const { data, error } = await supabase.functions.invoke('calendly-manage-webhook', {
            body: { action: 'setup', debug: true }
          });
          
          console.log("Webhook setup full response:", data);
          
          if (error) {
            // This handles errors from the invoke function itself
            console.error("Error setting up webhook (invoke error):", error);
            let errorMsg = `Edge Function returned a non-2xx status code`;
            setWebhookError(errorMsg);
            setFullErrorDetails(JSON.stringify(error, null, 2));
            toast({
              title: "Webhook Setup Error",
              description: errorMsg,
              variant: "destructive"
            });
          } else if (data?.error || data?.success === false) {
            // This handles errors returned in the response body with a 200 status code
            console.error("Error in webhook response:", data);
            
            let errorMessage = data.message || "Unknown error in response";
            setWebhookError(errorMessage);
            setFullErrorDetails(JSON.stringify(data, null, 2));
            
            toast({
              title: "Webhook Setup Error",
              description: errorMessage,
              variant: "destructive"
            });
          } else {
            console.log("Webhook setup successful:", data);
            setWebhookSetup(true);
            setWebhookError(null);
            setFullErrorDetails(null);
            toast({
              title: "Notifications Enabled",
              description: "Meeting notifications have been successfully set up.",
            });
          }
        } catch (err: any) {
          console.error("Webhook setup unexpected error:", err);
          setWebhookError(err.message || "Unexpected error");
          setFullErrorDetails(JSON.stringify(err, null, 2));
          toast({
            title: "Webhook Setup Error",
            description: `Unexpected error: ${err.message || "Please check console logs for details"}`,
            variant: "destructive"
          });
        } finally {
          setSetupAttempted(true);
          setIsSettingUpWebhook(false);
        }
      }
    };
    
    // Only setup webhook in production environment
    if (import.meta.env.PROD) {
      setupWebhook();
    } else {
      console.log("Skipping webhook setup in development environment");
    }
  }, [toast]); // Removed webhookSetup and setupAttempted to force re-setup on every load

  return {
    initialLoad,
    webhookError,
    fullErrorDetails,
    isSettingUpWebhook,
    retryWebhookSetup
  };
};

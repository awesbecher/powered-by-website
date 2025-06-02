
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useWebhookSetup() {
  const [isSettingUpWebhook, setIsSettingUpWebhook] = useState(false);
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const [fullErrorDetails, setFullErrorDetails] = useState<string | null>(null);
  const [webhookSetupComplete, setWebhookSetupComplete] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const { toast } = useToast();

  // Check webhook status on initial load
  const initializeWebhookSetup = async () => {
    try {
      // Check if webhook is already set up (in local storage for persistence)
      const storedStatus = localStorage.getItem('calendlyWebhookStatus');
      if (storedStatus === 'complete') {
        setWebhookSetupComplete(true);
      }
      
      // Finish initial loading state after a short delay
      setTimeout(() => {
        setInitialLoad(false);
      }, 500);
    } catch (error) {
      console.error('Error initializing webhook setup:', error);
    }
  };

  // Function to set up webhook manually if needed
  const setupWebhook = async () => {
    setIsSettingUpWebhook(true);
    setWebhookError(null);
    setFullErrorDetails(null);

    try {
      // Call the updated Supabase function that manages the Calendly webhook
      const { data, error } = await supabase.functions.invoke('calendly-manage-webhook');
      
      if (error) {
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || data.message || 'Unknown error occurred while setting up webhook');
      }

      // Store webhook setup status in localStorage for persistence
      localStorage.setItem('calendlyWebhookStatus', 'complete');
      setWebhookSetupComplete(true);
      
      toast({
        title: "Webhook setup successful",
        description: "Calendly webhook has been configured successfully."
      });
    } catch (error: any) {
      console.error('Webhook setup error:', error);
      setWebhookError(error.message);
      setFullErrorDetails(JSON.stringify(error, null, 2));
      toast({
        title: "Webhook setup failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSettingUpWebhook(false);
    }
  };

  // Function to retry webhook setup
  const retryWebhookSetup = async () => {
    await setupWebhook();
  };

  // Initialize on first render
  useEffect(() => {
    initializeWebhookSetup();
  }, []);

  return {
    isSettingUpWebhook,
    webhookError,
    fullErrorDetails,
    webhookSetupComplete,
    initialLoad,
    setupWebhook,
    retryWebhookSetup
  };
}

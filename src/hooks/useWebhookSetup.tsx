
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

  // Initialize webhook setup - can be called once on page load
  const initializeWebhookSetup = async () => {
    // Just finish the initial loading state after a short delay
    setTimeout(() => {
      setInitialLoad(false);
    }, 500);
  };

  // Function to set up webhook manually if needed
  const setupWebhook = async () => {
    setIsSettingUpWebhook(true);
    setWebhookError(null);
    setFullErrorDetails(null);

    try {
      const { data, error } = await supabase.functions.invoke('register-calendly-webhook');
      
      if (error) {
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred while setting up webhook');
      }

      setWebhookSetupComplete(true);
      toast({
        title: "Webhook setup successful",
        description: "Calendly webhook has been configured successfully."
      });
    } catch (error) {
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

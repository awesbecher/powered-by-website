
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useWebhookSetup = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const [fullErrorDetails, setFullErrorDetails] = useState<string | null>(null);
  const [isSettingUpWebhook, setIsSettingUpWebhook] = useState(false);
  const { toast } = useToast();

  // Empty function that does nothing
  const retryWebhookSetup = async () => {
    // Webhook functionality has been disabled
    toast({
      title: "Webhook Setup Disabled",
      description: "Webhook functionality has been disabled in this version.",
    });
    return;
  };

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
    
    // Webhook functionality has been disabled
    console.log("Webhook functionality has been disabled");
    
  }, [toast]);

  return {
    initialLoad,
    webhookError: null, // Always return null to prevent error display
    fullErrorDetails: null,
    isSettingUpWebhook: false,
    retryWebhookSetup
  };
};

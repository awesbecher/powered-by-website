
import { useState, useEffect } from "react";
import { ContactHeader } from "@/components/contact/ContactHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Contact = () => {
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
    
    // Load Calendly script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
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
    
    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [toast]); // Removed webhookSetup and setupAttempted to force re-setup on every load

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      {/* Content section with even less padding to maximize space */}
      <div className="flex-grow flex flex-col relative z-10 pt-6 px-4">
        <div className="max-w-2xl mx-auto w-full">
          {/* Minimized margin for header */}
          <div className="mb-6">
            <ContactHeader initialLoad={initialLoad} />
          </div>
          
          {/* Show error message with retry button if webhook setup failed */}
          {webhookError && (
            <div className="bg-red-900/70 text-white p-4 rounded-lg mb-6 backdrop-blur">
              <h3 className="font-medium text-lg mb-2">Webhook Setup Error</h3>
              <p className="mb-3">Failed to set up meeting notifications: {webhookError}</p>
              <p className="text-sm mb-3">This may be due to a permissions issue or configuration problem with the Calendly API key.</p>
              
              {fullErrorDetails && (
                <div className="mb-4">
                  <details className="text-xs">
                    <summary className="cursor-pointer hover:underline mb-2">Show technical details</summary>
                    <div className="bg-red-950/70 p-3 rounded overflow-auto max-h-40">
                      <pre>{fullErrorDetails}</pre>
                    </div>
                  </details>
                </div>
              )}
              
              <Button 
                onClick={retryWebhookSetup} 
                variant="destructive"
                disabled={isSettingUpWebhook}
                className="bg-red-700 hover:bg-red-600"
              >
                {isSettingUpWebhook ? "Trying again..." : "Retry Setup"}
              </Button>
            </div>
          )}
          
          {/* Reduced padding for Calendly widget */}
          <div className="bg-neutral-900/50 p-0 rounded-xl backdrop-blur mb-6">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/d/crrs-fbd-3hf?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=a800ff" 
              style={{ minWidth: "320px", height: "900px" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      
      <Footer />
    </div>
  );
};

export default Contact;

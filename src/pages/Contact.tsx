
import { useState, useEffect } from "react";
import { ContactHeader } from "@/components/contact/ContactHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [webhookSetup, setWebhookSetup] = useState(false);
  const [setupAttempted, setSetupAttempted] = useState(false);
  const [isSettingUpWebhook, setIsSettingUpWebhook] = useState(false);
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
    
    // Load Calendly script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    // Reset webhook setup state - this will trigger a fresh attempt with the new API key
    setWebhookSetup(false);
    setSetupAttempted(false);
    
    // Setup Calendly webhook if not already done
    const setupWebhook = async () => {
      try {
        if (!webhookSetup && !setupAttempted && !isSettingUpWebhook) {
          setIsSettingUpWebhook(true);
          setWebhookError(null);
          console.log("Attempting to set up Calendly webhook with updated API key");
          
          const { data, error } = await supabase.functions.invoke('calendly-manage-webhook', {
            body: { action: 'setup' }
          });
          
          console.log("Webhook setup response:", data);
          
          if (error) {
            console.error("Error setting up webhook (invoke error):", error);
            setWebhookError(`API error: ${error.message}`);
            toast({
              title: "Webhook Setup Error",
              description: `Failed to set up meeting notifications: ${error.message}`,
              variant: "destructive"
            });
          } else if (data?.error) {
            console.error("Error in webhook response:", data.error);
            setWebhookError(data.message || "Unknown error in response");
            toast({
              title: "Webhook Setup Error",
              description: data.message || "Failed to set up meeting notifications. Please try again later.",
              variant: "destructive"
            });
          } else {
            console.log("Webhook setup successful:", data);
            setWebhookSetup(true);
            setWebhookError(null);
            toast({
              title: "Notifications Enabled",
              description: "Meeting notifications have been successfully set up.",
            });
          }
          
          setSetupAttempted(true);
          setIsSettingUpWebhook(false);
        }
      } catch (err: any) {
        console.error("Webhook setup error:", err);
        setIsSettingUpWebhook(false);
        setSetupAttempted(true);
        setWebhookError(err.message || "Unexpected error");
        toast({
          title: "Webhook Setup Error",
          description: `Unexpected error: ${err.message || "Please check console logs for details"}`,
          variant: "destructive"
        });
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
  }, [toast]); // Removed webhookSetup and setupAttempted from dependency array to force re-setup

  // Function to retry webhook setup
  const retryWebhookSetup = () => {
    setSetupAttempted(false);
    setWebhookError(null);
  };

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
              <p className="text-sm mb-3">This may be due to a missing API key or configuration issue.</p>
              <button 
                onClick={retryWebhookSetup} 
                className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md text-white transition-colors"
                disabled={isSettingUpWebhook}
              >
                {isSettingUpWebhook ? "Trying again..." : "Retry Setup"}
              </button>
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

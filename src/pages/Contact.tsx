
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { CalendlyWidget } from "@/components/contact/CalendlyWidget";
import { WebhookErrorDisplay } from "@/components/contact/WebhookErrorDisplay";
import { useWebhookSetup } from "@/hooks/useWebhookSetup";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

const Contact = () => {
  const { 
    initialLoad, 
    webhookError, 
    fullErrorDetails, 
    isSettingUpWebhook, 
    webhookSetupComplete, 
    retryWebhookSetup,
    setupWebhook 
  } = useWebhookSetup();

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
          
          {/* Show webhook error if there is one */}
          {webhookError && (
            <WebhookErrorDisplay 
              webhookError={webhookError}
              fullErrorDetails={fullErrorDetails}
              isSettingUpWebhook={isSettingUpWebhook}
              retryWebhookSetup={retryWebhookSetup}
            />
          )}
          
          {/* Show webhook setup button if not complete and no error */}
          {!webhookSetupComplete && !webhookError && (
            <div className="mb-4 flex justify-center">
              <Button 
                onClick={setupWebhook}
                disabled={isSettingUpWebhook}
                className="bg-[#9b87f5] hover:bg-[#8a74e8] flex items-center"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {isSettingUpWebhook ? "Setting up Calendly..." : "Enable Calendly Notifications"}
              </Button>
            </div>
          )}
          
          {/* Calendly widget */}
          <CalendlyWidget initialLoad={initialLoad} />
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

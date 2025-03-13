
import { Button } from "@/components/ui/button";

interface WebhookErrorDisplayProps {
  webhookError: string | null;
  fullErrorDetails: string | null;
  isSettingUpWebhook: boolean;
  retryWebhookSetup: () => Promise<void>;
}

export const WebhookErrorDisplay = ({
  webhookError,
  fullErrorDetails,
  isSettingUpWebhook,
  retryWebhookSetup
}: WebhookErrorDisplayProps) => {
  if (!webhookError) return null;
  
  return (
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
  );
};

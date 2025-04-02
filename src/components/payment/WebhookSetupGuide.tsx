
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface WebhookSetupGuideProps {
  webhookUrl: string;
}

const WebhookSetupGuide: React.FC<WebhookSetupGuideProps> = ({ webhookUrl }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    toast.success("Webhook URL copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stripe Webhook Setup</CardTitle>
        <CardDescription>
          Configure webhooks to receive payment events in real-time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Webhook URL</h3>
          <div className="flex items-center gap-2">
            <code className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs flex-1 overflow-x-auto">
              {webhookUrl}
            </code>
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Setup Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Go to your <a href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stripe Dashboard</a></li>
            <li>Click "Add Endpoint" and paste the webhook URL</li>
            <li>Select these events to listen for:
              <ul className="list-disc list-inside ml-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                <li>checkout.session.completed</li>
                <li>payment_intent.succeeded</li>
                <li>payment_intent.payment_failed</li>
                <li>customer.subscription.created</li>
                <li>customer.subscription.updated</li>
                <li>customer.subscription.deleted</li>
              </ul>
            </li>
            <li>Copy the signing secret</li>
            <li>Add the signing secret to your environment variables as <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">STRIPE_WEBHOOK_SECRET</code></li>
          </ol>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener noreferrer">
            Open Stripe Dashboard <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WebhookSetupGuide;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceTrigger from "../voice-agent-builder/VoiceTrigger";
import { Bot, ArrowRight, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock webhook data - in a real application, this would come from your database
const MOCK_WEBHOOKS = [
  { id: "wh_abc123", name: "Zapier Integration" },
  { id: "wh_def456", name: "Make.com Workflow" },
  { id: "wh_ghi789", name: "IoT Device Trigger" }
];

const VoiceToWebhookSection: React.FC = () => {
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [selectedWebhook, setSelectedWebhook] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTranscription = (text: string) => {
    setTranscribedText(text);
  };

  const handleSendToWebhook = () => {
    if (!transcribedText || !selectedWebhook) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please record a message and select a webhook",
      });
      return;
    }

    setIsLoading(true);

    // In a real application, this would send the data to your backend
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Transcription sent to webhook: ${MOCK_WEBHOOKS.find(wh => wh.id === selectedWebhook)?.name}`,
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">
            <Bot className="text-[#9b87f5]" size={24} />
          </span>
          Voice to Webhook
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-white/80 mb-4">
            Record an audio message and send the transcription to a webhook endpoint.
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 bg-[#2f1c4a]/40 p-4 rounded-lg border border-white/10">
              <div className="text-center mb-4">
                <div className="inline-block bg-[#9b87f5]/20 p-2 rounded-full mb-2">
                  <Bot className="text-[#9b87f5]" size={24} />
                </div>
                <h3 className="text-white font-medium">Step 1: Record or Upload</h3>
              </div>
              <VoiceTrigger onTranscription={handleTranscription} />
            </div>
            
            <div className="hidden md:flex">
              <ArrowRight className="text-[#9b87f5]" size={24} />
            </div>
            
            <div className="flex-1 bg-[#2f1c4a]/40 p-4 rounded-lg border border-white/10">
              <div className="text-center mb-4">
                <div className="inline-block bg-[#9b87f5]/20 p-2 rounded-full mb-2">
                  <Bot className="text-[#9b87f5]" size={24} />
                </div>
                <h3 className="text-white font-medium">Step 2: Transcription Result</h3>
              </div>
              {transcribedText ? (
                <div className="bg-[#1a0b2e]/60 p-4 rounded-lg border border-[#9b87f5]/30 text-white min-h-[100px] max-h-[200px] overflow-y-auto break-words">
                  {transcribedText}
                </div>
              ) : (
                <div className="bg-[#1a0b2e]/60 p-4 rounded-lg border border-white/10 text-white/50 min-h-[100px] flex items-center justify-center text-center">
                  Your transcribed text will appear here...
                </div>
              )}
            </div>
            
            <div className="hidden md:flex">
              <ArrowRight className="text-[#9b87f5]" size={24} />
            </div>
            
            <div className="flex-1 bg-[#2f1c4a]/40 p-4 rounded-lg border border-white/10">
              <div className="text-center mb-4">
                <div className="inline-block bg-[#9b87f5]/20 p-2 rounded-full mb-2">
                  <Webhook className="text-[#9b87f5]" size={24} />
                </div>
                <h3 className="text-white font-medium">Step 3: Send to Webhook</h3>
              </div>
              
              <Select value={selectedWebhook} onValueChange={setSelectedWebhook}>
                <SelectTrigger className="bg-[#1a0b2e]/40 border-white/20 text-white mb-4">
                  <SelectValue placeholder="Select webhook destination" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a0b2e] border-white/20">
                  {MOCK_WEBHOOKS.map(webhook => (
                    <SelectItem key={webhook.id} value={webhook.id} className="text-white hover:bg-[#2f1c4a]">
                      {webhook.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                onClick={handleSendToWebhook}
                disabled={isLoading || !transcribedText || !selectedWebhook}
                className="w-full bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white font-medium"
              >
                {isLoading ? "Sending..." : "Send to Webhook"}
              </Button>
              <p className="text-white/60 text-xs mt-2 text-center">
                This will send the transcribed text to the selected webhook endpoint
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceToWebhookSection;

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Copy, RefreshCw, Globe, Key, PlusCircle, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WebhookTriggerSectionProps {
  agentId?: string;
  agentName?: string;
}

interface Webhook {
  id: string;
  name: string;
  secret_key: string;
  created_at: string;
  last_triggered?: string;
  is_active: boolean;
}

const generateWebhookId = () => {
  return `wh_${Math.random().toString(36).substring(2, 15)}`;
};

const generateSecretKey = () => {
  return `sk_${Math.random().toString(36).substring(2, 15)}`;
};

const WebhookTriggerSection: React.FC<WebhookTriggerSectionProps> = ({ agentId = "default", agentName = "My Agent" }) => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [newWebhookName, setNewWebhookName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("webhooks");
  const [webhookLogs, setWebhookLogs] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setWebhooks([
      {
        id: generateWebhookId(),
        name: `${agentName} Webhook`,
        secret_key: generateSecretKey(),
        created_at: new Date().toISOString(),
        is_active: true
      }
    ]);
  }, [agentName]);

  const fetchWebhooks = async () => {
    setIsLoading(true);
    try {
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching webhooks:", error);
      toast({
        title: "Error",
        description: "Failed to fetch webhooks",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const fetchWebhookLogs = async () => {
    setIsLoading(true);
    try {
      setWebhookLogs([
        {
          id: "1",
          webhook_id: webhooks[0]?.id,
          triggered_at: new Date().toISOString(),
          source_ip: "192.168.1.1",
          payload: { userMessage: "Test message from webhook" },
          status: "success"
        }
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching webhook logs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch webhook logs",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const createWebhook = async () => {
    if (!newWebhookName) {
      toast({
        title: "Error",
        description: "Please enter a webhook name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const newWebhook: Webhook = {
        id: generateWebhookId(),
        name: newWebhookName,
        secret_key: generateSecretKey(),
        created_at: new Date().toISOString(),
        is_active: true
      };
      
      setWebhooks([...webhooks, newWebhook]);
      setNewWebhookName("");
      toast({
        title: "Success",
        description: "Webhook created successfully",
      });
    } catch (error) {
      console.error("Error creating webhook:", error);
      toast({
        title: "Error",
        description: "Failed to create webhook",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWebhookStatus = async (webhookId: string, currentStatus: boolean) => {
    try {
      setWebhooks(webhooks.map(wh => 
        wh.id === webhookId ? {...wh, is_active: !currentStatus} : wh
      ));
      
      toast({
        title: "Success",
        description: `Webhook ${currentStatus ? "disabled" : "enabled"} successfully`,
      });
    } catch (error) {
      console.error("Error updating webhook status:", error);
      toast({
        title: "Error",
        description: "Failed to update webhook status",
        variant: "destructive",
      });
    }
  };

  const deleteWebhook = async (webhookId: string) => {
    try {
      setWebhooks(webhooks.filter(wh => wh.id !== webhookId));
      
      toast({
        title: "Success",
        description: "Webhook deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting webhook:", error);
      toast({
        title: "Error",
        description: "Failed to delete webhook",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string, webhookId: string) => {
    navigator.clipboard.writeText(text);
    setCopied(webhookId);
    setTimeout(() => setCopied(null), 2000);
    
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    });
  };

  const getWebhookUrl = (webhookId: string) => {
    return `${window.location.origin}/api/agent-webhook/${webhookId}`;
  };

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#2f1c4a] to-[#1a0b2e] shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">
            <Globe className="text-[#9b87f5]" size={24} />
          </span>
          Webhook Trigger
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-[#1A1F2C]/80 border border-white/10 w-full flex">
            <TabsTrigger value="webhooks" className="flex-1">
              Webhooks
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex-1" onClick={fetchWebhookLogs}>
              Logs
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex-1">
              Documentation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="webhooks">
            <div className="space-y-6">
              <div className="text-white/80 mb-4">
                Create webhook URLs that external tools (Zapier, Make, IoT devices) can call to trigger your agent.
              </div>
              
              <div className="bg-[#1a0b2e]/60 p-4 rounded-lg border border-white/10">
                <h3 className="text-white font-medium mb-3">Create New Webhook</h3>
                <div className="flex gap-3">
                  <Input
                    value={newWebhookName}
                    onChange={(e) => setNewWebhookName(e.target.value)}
                    placeholder="Webhook Name"
                    className="bg-[#1a0b2e]/40 border-white/20 text-white"
                  />
                  <Button
                    onClick={createWebhook}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white font-medium whitespace-nowrap"
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4 mr-1" />
                    )}
                    Create Webhook
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="bg-[#1a0b2e]/60 p-4 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white font-medium">{webhook.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/60">
                          {webhook.is_active ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={webhook.is_active}
                          onCheckedChange={() => toggleWebhookStatus(webhook.id, webhook.is_active)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-[#1a0b2e]/60 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                        <div className="text-sm text-white/80 truncate flex-1">
                          {getWebhookUrl(webhook.id)}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={() => copyToClipboard(getWebhookUrl(webhook.id), `url-${webhook.id}`)}
                        >
                          {copied === `url-${webhook.id}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      <div className="bg-[#1a0b2e]/60 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Key className="text-[#9b87f5] h-4 w-4" />
                          <div className="text-sm text-white/80 font-mono">
                            {webhook.secret_key}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={() => copyToClipboard(webhook.secret_key, `key-${webhook.id}`)}
                        >
                          {copied === `key-${webhook.id}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-white/60">
                        <div>Created: {new Date(webhook.created_at).toLocaleDateString()}</div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => deleteWebhook(webhook.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {webhooks.length === 0 && (
                  <div className="bg-[#1a0b2e]/20 p-6 rounded-lg border border-white/10 text-center">
                    <p className="text-white/60">No webhooks created yet. Create your first webhook above.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">Recent Webhook Triggers</h3>
                <Button
                  onClick={fetchWebhookLogs}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
              
              {webhookLogs.length > 0 ? (
                <div className="space-y-3">
                  {webhookLogs.map((log) => (
                    <div key={log.id} className="bg-[#1a0b2e]/40 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-white font-medium">
                          {webhooks.find(w => w.id === log.webhook_id)?.name || "Unknown Webhook"}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          log.status === 'success' 
                            ? 'bg-green-900/30 text-green-300' 
                            : 'bg-red-900/30 text-red-300'
                        }`}>
                          {log.status === 'success' ? 'Success' : 'Failed'}
                        </div>
                      </div>
                      
                      <div className="text-xs text-white/60 mb-2">
                        {new Date(log.triggered_at).toLocaleString()} · IP: {log.source_ip}
                      </div>
                      
                      <div className="bg-[#1a0b2e]/60 p-3 rounded-lg border border-white/10">
                        <pre className="text-xs text-white/80 overflow-x-auto">
                          {JSON.stringify(log.payload, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#1a0b2e]/20 p-6 rounded-lg border border-white/10 text-center">
                  <p className="text-white/60">No webhook logs found. Webhook triggers will appear here.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="docs">
            <div className="space-y-4">
              <div className="bg-[#1a0b2e]/40 p-4 rounded-lg border border-white/10">
                <h3 className="text-white font-medium mb-3">How to Use Webhooks</h3>
                <div className="text-white/80 space-y-3">
                  <p>
                    Your webhook URL can be called from any service that supports HTTP requests (Zapier, Make, IoT devices, etc.). 
                    Here's how to implement it:
                  </p>
                  
                  <div className="bg-[#1a0b2e]/60 p-3 rounded-lg border border-white/10">
                    <h4 className="text-sm font-medium text-[#9b87f5] mb-2">HTTP Method</h4>
                    <code className="text-white/80 font-mono">POST</code>
                  </div>
                  
                  <div className="bg-[#1a0b2e]/60 p-3 rounded-lg border border-white/10">
                    <h4 className="text-sm font-medium text-[#9b87f5] mb-2">Headers</h4>
                    <code className="text-white/80 font-mono">Content-Type: application/json</code><br />
                    <code className="text-white/80 font-mono">Authorization: Bearer YOUR_SECRET_KEY</code>
                  </div>
                  
                  <div className="bg-[#1a0b2e]/60 p-3 rounded-lg border border-white/10">
                    <h4 className="text-sm font-medium text-[#9b87f5] mb-2">Request Body (optional)</h4>
                    <pre className="text-white/80 font-mono text-xs overflow-x-auto">
{`{
  "userMessage": "Your message to the agent",
  "context": {
    "any": "additional data"
  }
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-[#1a0b2e]/60 p-3 rounded-lg border border-white/10">
                    <h4 className="text-sm font-medium text-[#9b87f5] mb-2">Example Zapier Configuration</h4>
                    <p className="text-white/80 text-sm mb-2">In your Zap, choose "Webhooks by Zapier" as the action:</p>
                    <ol className="list-decimal list-inside text-white/80 text-sm space-y-1">
                      <li>Set the URL to your webhook URL</li>
                      <li>Set the Method to POST</li>
                      <li>Add header: Content-Type = application/json</li>
                      <li>Add header: Authorization = Bearer YOUR_SECRET_KEY</li>
                      <li>Set the Body Type to JSON</li>
                      <li>Add your JSON payload with the userMessage field</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WebhookTriggerSection;

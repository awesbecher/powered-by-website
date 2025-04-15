
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PLAN_LIMITS = {
  free: { agents: 1, messages: 100 },
  starter: { agents: 5, messages: 1000 },
  growth: { agents: 15, messages: 2500 },
  scale: { agents: Infinity, messages: Infinity },
};

interface UsageLimits {
  isLoading: boolean;
  canCreateAgent: boolean;
  canSendMessage: boolean;
  incrementAgentCount: () => Promise<boolean>;
  incrementMessageCount: () => Promise<boolean>;
  usageData: {
    plan: string;
    agentsCreated: number;
    messagesSent: number;
    agentLimit: number | string;
    messageLimit: number | string;
  };
}

export const useUsageLimits = (userId: string | undefined | null): UsageLimits => {
  const [plan, setPlan] = useState("free");
  const [agentsCreated, setAgentsCreated] = useState(0);
  const [messagesSent, setMessagesSent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const agentLimit = plan ? PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.agents || 0 : 0;
  const messageLimit = plan ? PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.messages || 0 : 0;

  const canCreateAgent = agentLimit === Infinity || agentsCreated < agentLimit;
  const canSendMessage = messageLimit === Infinity || messagesSent < messageLimit;

  useEffect(() => {
    const fetchUsageData = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user's plan
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("plan")
          .eq("user_id", userId)
          .single();
        
        if (profileError && profileError.code !== 'PGRST116') {
          console.error("Error fetching user profile:", profileError);
        }
        
        const userPlan = profileData?.plan || "free";
        setPlan(userPlan);

        // Fetch usage data
        const { data: usageData, error: usageError } = await supabase
          .from("usage_limits")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (usageError && usageError.code !== 'PGRST116') {
          console.error("Error fetching usage data:", usageError);
        }

        if (usageData) {
          setAgentsCreated(usageData.agents_created || 0);
          setMessagesSent(usageData.messages_sent || 0);
        }
      } catch (error) {
        console.error("Error fetching usage data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsageData();
  }, [userId]);

  const incrementAgentCount = async (): Promise<boolean> => {
    if (!userId) return false;
    if (!canCreateAgent) {
      toast({
        title: "Agent limit reached",
        description: `You've reached your plan's limit of ${agentLimit === Infinity ? '∞' : agentLimit} agents. Upgrade your plan to create more agents.`,
        variant: "destructive",
      });
      return false;
    }

    try {
      const newCount = agentsCreated + 1;
      
      const { error } = await supabase
        .from("usage_limits")
        .upsert({ 
          user_id: userId, 
          agents_created: newCount,
          messages_sent: messagesSent
        });

      if (error) throw error;
      
      setAgentsCreated(newCount);
      return true;
    } catch (error) {
      console.error("Error updating agent count:", error);
      return false;
    }
  };

  const incrementMessageCount = async (): Promise<boolean> => {
    if (!userId) return false;
    if (!canSendMessage) {
      toast({
        title: "Message limit reached",
        description: `You've reached your plan's limit of ${messageLimit === Infinity ? '∞' : messageLimit} messages. Upgrade your plan to send more messages.`,
        variant: "destructive",
      });
      return false;
    }

    try {
      const newCount = messagesSent + 1;
      
      const { error } = await supabase
        .from("usage_limits")
        .upsert({ 
          user_id: userId, 
          agents_created: agentsCreated,
          messages_sent: newCount
        });

      if (error) throw error;
      
      setMessagesSent(newCount);
      return true;
    } catch (error) {
      console.error("Error updating message count:", error);
      return false;
    }
  };

  return {
    isLoading,
    canCreateAgent,
    canSendMessage,
    incrementAgentCount,
    incrementMessageCount,
    usageData: {
      plan,
      agentsCreated,
      messagesSent,
      agentLimit: agentLimit === Infinity ? "∞" : agentLimit,
      messageLimit: messageLimit === Infinity ? "∞" : messageLimit,
    }
  };
};

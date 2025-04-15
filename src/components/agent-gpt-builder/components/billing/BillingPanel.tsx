
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const PLAN_LIMITS = {
  free: { agents: 1, messages: 100 },
  starter: { agents: 5, messages: 1000 },
  growth: { agents: 15, messages: 2500 },
  scale: { agents: Infinity, messages: Infinity },
};

interface BillingPanelProps {
  user: { id: string } | null;
}

const BillingPanel: React.FC<BillingPanelProps> = ({ user }) => {
  const [plan, setPlan] = useState("free");
  const [usage, setUsage] = useState({ agents_created: 0, messages_sent: 0 });
  const [limits, setLimits] = useState(PLAN_LIMITS.free);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!user?.id) return;

        const { data: profile } = await supabase
          .from("user_profiles")
          .select("plan")
          .eq("user_id", user.id)
          .single();

        const userPlan = profile?.plan || "free";
        setPlan(userPlan);
        setLimits(PLAN_LIMITS[userPlan]);

        const { data: usageData } = await supabase
          .from("usage_limits")
          .select("*")
          .eq("user_id", user.id)
          .single();

        setUsage(usageData || { agents_created: 0, messages_sent: 0 });
      } catch (error) {
        console.error("Error loading billing data:", error);
        toast({
          title: "Error loading plan data",
          description: "We couldn't load your subscription information",
          variant: "destructive",
        });
      }
    };

    loadData();
  }, [user, toast]);

  const handleUpgrade = async (priceId: string) => {
    try {
      setIsLoading(true);
      
      if (!user?.id) {
        toast({
          title: "Authentication required",
          description: "Please sign in to upgrade your plan",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { user_id: user.id, price_id: priceId },
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout error",
        description: "We couldn't initiate the checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate percentage for progress bars
  const calculatePercentage = (used: number, limit: number): number => {
    if (limit === Infinity || limit === 0) return 0;
    return Math.min(Math.round((used / limit) * 100), 100);
  };

  const agentPercentage = calculatePercentage(usage.agents_created, limits.agents === Infinity ? 1000 : limits.agents);
  const messagePercentage = calculatePercentage(usage.messages_sent, limits.messages === Infinity ? 10000 : limits.messages);

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">💳</span>
          Subscription Plan
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
            </h2>
            <p className="text-gray-300 text-sm">
              {plan === "free" 
                ? "Limited features for getting started" 
                : plan === "scale" 
                  ? "Unlimited enterprise usage" 
                  : `Enhanced features for ${plan === "growth" ? "growing" : "new"} businesses`}
            </p>
          </div>
          
          {plan !== "scale" && (
            <Button 
              variant="gradient"
              onClick={() => window.location.href = "/pricing"}
              className="self-start"
            >
              View Upgrade Options
            </Button>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-200">Agents</span>
              <span className="text-gray-200">
                {usage.agents_created} / {limits.agents === Infinity ? "∞" : limits.agents}
              </span>
            </div>
            <Progress value={agentPercentage} className="h-2" 
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-200">Messages</span>
              <span className="text-gray-200">
                {usage.messages_sent} / {limits.messages === Infinity ? "∞" : limits.messages}
              </span>
            </div>
            <Progress value={messagePercentage} className="h-2" 
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            />
          </div>
        </div>
        
        {plan === "free" && (
          <div className="border-t border-white/10 pt-4 mt-4 space-y-4">
            <h3 className="text-lg font-medium text-white">Upgrade Your Plan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={() => handleUpgrade("price_1RDx8YP1PhXRWWHLMyCZSDJf")}
                disabled={isLoading}
                className="bg-[#584098] hover:bg-[#6c50b4] text-white w-full"
              >
                Upgrade to Starter ($299/mo)
              </Button>
              
              <Button 
                onClick={() => handleUpgrade("price_1RDx9BP1PhXRWWHLJyNv8nuW")}
                disabled={isLoading}
                className="bg-[#9b87f5] hover:bg-[#8976d9] text-white w-full"
              >
                Upgrade to Growth ($599/mo)
              </Button>
            </div>
            
            <p className="text-sm text-gray-300 text-center">
              Need Scale plan with unlimited usage?{" "}
              <a href="/contact" className="text-[#9b87f5] hover:underline">
                Talk to sales
              </a>
            </p>
          </div>
        )}
        
        {plan !== "scale" && plan !== "free" && (
          <div className="border-t border-white/10 pt-4 mt-4">
            <p className="text-sm text-gray-300">
              Enjoy your {plan.charAt(0).toUpperCase() + plan.slice(1)} plan.{" "}
              Need more capacity?{" "}
              <a href="/contact" className="text-[#9b87f5] hover:underline">
                Upgrade to Scale
              </a>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BillingPanel;

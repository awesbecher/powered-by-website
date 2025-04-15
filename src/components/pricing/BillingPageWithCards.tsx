
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Rocket, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Initialize Stripe with publishable key
const stripePromise = loadStripe("pk_live_51R79jUP1PhXRWWHLjHfTwVbIk11QPO4nN2jVTZy5RXPi9kPVMM4MLP98R6MLVLtEkQgAG6UxszRNfov7Ic8pwpYb00oHeE0GAX");

const PLAN_LIMITS = {
  free: { name: "Free", price: "$0", agents: 1, messages: 100, icon: <Star className="h-6 w-6 text-[#9b87f5]" /> },
  starter: { name: "Starter", price: "$299", agents: 5, messages: 1000, icon: <Star className="h-6 w-6 text-[#9b87f5]" /> },
  growth: { name: "Growth", price: "$599", agents: 15, messages: 2500, icon: <Rocket className="h-6 w-6 text-[#9b87f5]" /> },
  scale: { name: "Scale", price: "Custom", agents: "∞", messages: "∞", icon: <Award className="h-6 w-6 text-[#9b87f5]" /> },
};

const PRICE_IDS = {
  starter: "price_1RDx8YP1PhXRWWHLMyCZSDJf",
  growth: "price_1RDx9BP1PhXRWWHLJyNv8nuW",
};

interface BillingPageWithCardsProps {
  user: { id: string } | null;
}

const BillingPageWithCards: React.FC<BillingPageWithCardsProps> = ({ user }) => {
  const [currentPlan, setCurrentPlan] = useState<string>("free");
  const [usage, setUsage] = useState({ agents_created: 0, messages_sent: 0 });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const planOrder = ["free", "starter", "growth", "scale"];

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        // Get user profile with plan information
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("plan")
          .eq("user_id", user.id)
          .single();

        const plan = profileData?.plan || "free";
        setCurrentPlan(plan);

        // Get usage limits
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
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, toast]);

  const handleUpgrade = async (planKey: string) => {
    try {
      if (!user?.id) {
        toast({
          title: "Authentication required",
          description: "Please sign in to upgrade your plan",
          variant: "destructive",
        });
        return;
      }

      const price_id = PRICE_IDS[planKey as keyof typeof PRICE_IDS];
      if (!price_id) {
        toast({
          title: "Error",
          description: "Invalid plan selected",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { user_id: user.id, price_id },
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
    }
  };

  // Calculate percentage for progress bars
  const calculatePercentage = (used: number, limit: number | string): number => {
    if (limit === "∞" || limit === Infinity || typeof limit !== 'number' || limit === 0) return 0;
    return Math.min(Math.round((used / limit) * 100), 100);
  };

  const renderCard = (key: string) => {
    const plan = PLAN_LIMITS[key as keyof typeof PLAN_LIMITS];
    const isCurrent = currentPlan === key;
    const agentsLimit = typeof plan.agents === 'number' ? plan.agents : Infinity;
    const messagesLimit = typeof plan.messages === 'number' ? plan.messages : Infinity;
    
    const agentsPercentage = calculatePercentage(usage.agents_created, agentsLimit);
    const messagesPercentage = calculatePercentage(usage.messages_sent, messagesLimit);

    return (
      <Card 
        key={key} 
        className={`h-full transition-all ${
          isCurrent 
            ? "border-[#9b87f5] shadow-lg shadow-[#9b87f5]/20" 
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {plan.icon}
              <CardTitle>{plan.name}</CardTitle>
            </div>
            {isCurrent && (
              <Badge variant="outline" className="bg-[#9b87f5]/20 text-[#9b87f5] border-[#9b87f5]/50">
                Current Plan
              </Badge>
            )}
          </div>
          <div className="text-3xl font-bold text-white">{plan.price}<span className="text-sm text-gray-400">/month</span></div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Plan features */}
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-[#9b87f5] mt-0.5" />
              <span>
                {plan.agents} Agent{plan.agents === 1 ? '' : 's'}
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-[#9b87f5] mt-0.5" />
              <span>
                {plan.messages} Messages/month
              </span>
            </li>
            {["starter", "growth", "scale"].includes(key) && (
              <>
                <li className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-[#9b87f5] mt-0.5" />
                  <span>Voice Input</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-[#9b87f5] mt-0.5" />
                  <span>Custom Branding</span>
                </li>
              </>
            )}
            {key === "scale" && (
              <li className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-[#9b87f5] mt-0.5" />
                <span>Dedicated Support</span>
              </li>
            )}
          </ul>
          
          {isCurrent && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Agents</span>
                  <span>
                    {usage.agents_created} / {plan.agents === "∞" ? "∞" : plan.agents}
                  </span>
                </div>
                <Progress value={agentsPercentage} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Messages</span>
                  <span>
                    {usage.messages_sent} / {plan.messages === "∞" ? "∞" : plan.messages}
                  </span>
                </div>
                <Progress value={messagesPercentage} className="h-2" />
              </div>
            </div>
          )}
          
          <div className="pt-4">
            {isCurrent ? (
              <Button disabled className="w-full bg-[#9b87f5]/30">
                Current Plan
              </Button>
            ) : key === "scale" ? (
              <Button asChild className="w-full bg-[#9b87f5] hover:bg-[#8a75e3]">
                <a href="/contact">Contact Sales</a>
              </Button>
            ) : (
              <Button 
                onClick={() => handleUpgrade(key)} 
                className="w-full bg-[#9b87f5] hover:bg-[#8a75e3]"
              >
                Upgrade to {plan.name}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9b87f5]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1.5 rounded text-lg">💼</span>
          Your Current Plan
        </h2>
        
        {user ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                <div className="text-sm text-gray-400">Current Plan</div>
                <div className="text-xl font-bold text-white">{PLAN_LIMITS[currentPlan as keyof typeof PLAN_LIMITS]?.name || "Free"}</div>
              </div>
              
              <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                <div className="text-sm text-gray-400">Agents Used</div>
                <div className="text-xl font-bold text-white">
                  {usage.agents_created} / {PLAN_LIMITS[currentPlan as keyof typeof PLAN_LIMITS]?.agents === "∞" 
                    ? "∞" 
                    : PLAN_LIMITS[currentPlan as keyof typeof PLAN_LIMITS]?.agents}
                </div>
              </div>
              
              <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                <div className="text-sm text-gray-400">Messages Used</div>
                <div className="text-xl font-bold text-white">
                  {usage.messages_sent} / {PLAN_LIMITS[currentPlan as keyof typeof PLAN_LIMITS]?.messages === "∞" 
                    ? "∞" 
                    : PLAN_LIMITS[currentPlan as keyof typeof PLAN_LIMITS]?.messages}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-300 mb-4">Sign in to see your plan details and usage</p>
            <Button asChild className="bg-[#9b87f5] hover:bg-[#8a75e3]">
              <a href="/login">Sign In</a>
            </Button>
          </div>
        )}
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-4">Available Plans</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planOrder.map((planKey) => renderCard(planKey))}
      </div>
    </div>
  );
};

export default BillingPageWithCards;

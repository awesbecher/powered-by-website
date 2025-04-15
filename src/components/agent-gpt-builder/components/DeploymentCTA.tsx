
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const DeploymentCTA: React.FC = () => {
  const { toast } = useToast();
  const [user, setUser] = React.useState<{ id: string } | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upgrade your plan",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
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

  return (
    <Card className="bg-gradient-to-br from-[#1a0b2e]/90 to-[#2f1c4a]/90 border border-white/10 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#6a5acd] bg-clip-text text-transparent mb-4">
        Deploy Your Agent
      </h2>
      
      <div className="space-y-6 text-gray-300">
        <p>
          Choose your plan to deploy your agent. Upgrade to access more features and higher usage limits.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="border border-white/10 rounded-lg p-4 bg-black/20 hover:bg-black/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">Starter Plan</h3>
            <p className="text-sm mb-2">$299/month</p>
            <ul className="text-sm mb-4 space-y-1">
              <li>• 5 Agent Deployments</li>
              <li>• 1,000 Messages/month</li>
              <li>• Voice Input Support</li>
            </ul>
            <Button 
              variant="outline" 
              className="w-full"
              disabled={isLoading}
              onClick={() => handleCheckout("price_1RDx8YP1PhXRWWHLMyCZSDJf")}
            >
              {isLoading ? "Processing..." : "Upgrade to Starter"}
            </Button>
          </div>
          
          <div className="border border-white/10 rounded-lg p-4 bg-black/20 hover:bg-black/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">Growth Plan</h3>
            <p className="text-sm mb-2">$599/month</p>
            <ul className="text-sm mb-4 space-y-1">
              <li>• 15 Agent Deployments</li>
              <li>• 2,500 Messages/month</li>
              <li>• Priority Support</li>
            </ul>
            <Button 
              variant="outline" 
              className="w-full"
              disabled={isLoading}
              onClick={() => handleCheckout("price_1RDx9BP1PhXRWWHLJyNv8nuW")}
            >
              {isLoading ? "Processing..." : "Upgrade to Growth"}
            </Button>
          </div>
          
          <div className="border border-white/10 rounded-lg p-4 bg-black/20 hover:bg-black/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">Custom Integration</h3>
            <p className="text-sm mb-4">
              Need a custom deployment solution? Contact our team for enterprise options.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
          
          <div className="border border-white/10 rounded-lg p-4 bg-black/20 hover:bg-black/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">View All Plans</h3>
            <p className="text-sm mb-4">
              Compare all plans and see which one is right for you.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/pricing">View All Plans</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm opacity-80">
            Need help deploying your agent? Our team is here to help! Contact us for assistance.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DeploymentCTA;

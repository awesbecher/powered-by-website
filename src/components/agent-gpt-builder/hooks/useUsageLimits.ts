import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUsageLimits = () => {
  const [usage, setUsage] = useState({ agents_created: 0, messages_sent: 0 });
  const [limits, setLimits] = useState({ agents: 1, messages: 100 });
  const [plan, setPlan] = useState('free');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserAndUsage = async () => {
      try {
        // Get current user
        const { data } = await supabase.auth.getUser();
        if (!data?.user) {
          setLoading(false);
          return;
        }

        setUser(data.user);

        // Get user's plan
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('plan')
          .eq('user_id', data.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          console.error('Error fetching user plan:', profileError);
        }

        // Set plan (default to 'free' if not found)
        const userPlan = profileData?.plan || 'free';
        setPlan(userPlan);

        // Set limits based on plan
        const PLAN_LIMITS: Record<string, { agents: number, messages: number }> = {
          free: { agents: 1, messages: 100 },
          starter: { agents: 5, messages: 1000 },
          growth: { agents: 15, messages: 2500 },
          scale: { agents: Infinity, messages: Infinity },
        };

        setLimits(PLAN_LIMITS[userPlan] || PLAN_LIMITS.free);

        // Fetch usage data
        const { data: usageData, error: usageError } = await supabase
          .from('usage_limits')
          .select('agents_created, messages_sent')
          .eq('user_id', data.user.id)
          .single();

        if (usageError && usageError.code !== 'PGRST116') {
          console.error('Error fetching usage data:', usageError);
        }

        // Set usage (default to 0 if not found)
        setUsage(usageData || { agents_created: 0, messages_sent: 0 });
      } catch (error) {
        console.error('Error in fetchUserAndUsage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndUsage();
  }, []);

  // Check if user is within agent creation limit
  const checkAgentCreationLimit = (): boolean => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to create an agent.',
        variant: 'destructive',
      });
      return false;
    }

    if (usage.agents_created >= limits.agents) {
      toast({
        title: 'Agent limit reached',
        description: `Your ${plan} plan is limited to ${limits.agents} ${limits.agents === 1 ? 'agent' : 'agents'}. Please upgrade your plan to create more agents.`,
        variant: 'destructive',
      });
      return false;
    }

    // Increment agent count in DB
    incrementAgentCount();
    return true;
  };

  // Check if user is within message limit
  const checkMessageLimit = (checkOnly: boolean = false): boolean => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to interact with agents.',
        variant: 'destructive',
      });
      return false;
    }

    if (usage.messages_sent >= limits.messages) {
      toast({
        title: 'Message limit reached',
        description: `Your ${plan} plan is limited to ${limits.messages} messages per month. Please upgrade your plan to send more messages.`,
        variant: 'destructive',
      });
      return false;
    }

    // If we're just checking (not sending a message), return true
    if (checkOnly) return true;

    // Otherwise increment message count in DB
    incrementMessageCount();
    return true;
  };

  // Increment agent count
  const incrementAgentCount = async () => {
    if (!user) return;

    const newCount = usage.agents_created + 1;
    
    // Update local state immediately for better UX
    setUsage(prev => ({ ...prev, agents_created: newCount }));
    
    try {
      // Update the database count
      const { error } = await supabase
        .from('usage_limits')
        .upsert(
          { 
            user_id: user.id, 
            agents_created: newCount,
            messages_sent: usage.messages_sent,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id' }
        );

      if (error) {
        console.error('Error updating agent count:', error);
      }
    } catch (error) {
      console.error('Error in incrementAgentCount:', error);
    }
  };

  // Increment message count
  const incrementMessageCount = async () => {
    if (!user) return;

    const newCount = usage.messages_sent + 1;
    
    // Update local state immediately for better UX
    setUsage(prev => ({ ...prev, messages_sent: newCount }));
    
    try {
      // Update the database count
      const { error } = await supabase
        .from('usage_limits')
        .upsert(
          { 
            user_id: user.id, 
            messages_sent: newCount,
            agents_created: usage.agents_created,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id' }
        );

      if (error) {
        console.error('Error updating message count:', error);
      }
    } catch (error) {
      console.error('Error in incrementMessageCount:', error);
    }
  };

  return {
    usageLimits: { usage, limits, plan, loading },
    checkAgentCreationLimit,
    checkMessageLimit,
  };
};

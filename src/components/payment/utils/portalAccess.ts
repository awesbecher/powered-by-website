
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Access the Stripe customer portal for managing payments and subscriptions
 * @param email Customer email address
 */
export const accessCustomerPortal = async (email: string) => {
  if (!email) {
    toast.error("Please enter your email address to access the customer portal");
    return;
  }
  
  let loading = true;
  
  try {
    toast.info("Preparing customer portal...");
    
    const { data, error } = await supabase.functions.invoke('customer-portal', {
      body: { customerEmail: email }
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (data?.url) {
      toast.success("Redirecting to customer portal...");
      
      setTimeout(() => {
        window.location.href = data.url;
      }, 1000);
    } else {
      throw new Error('No portal URL returned');
    }
  } catch (error) {
    console.error('Portal error:', error);
    toast.error("Unable to access customer portal. Please try again.");
  } finally {
    loading = false;
  }
  
  return loading;
};

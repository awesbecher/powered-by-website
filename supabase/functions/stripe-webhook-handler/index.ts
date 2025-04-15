
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeKey) {
    return new Response(
      JSON.stringify({ error: "Missing Stripe secret key" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: "2023-10-16",
  });

  // Create Supabase client
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ error: "Missing Supabase credentials" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Get raw request body
    const body = await req.text();
    // Get the Stripe signature from headers
    const signature = req.headers.get("stripe-signature") || "";

    // Get the webhook secret from env
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      return new Response(
        JSON.stringify({ error: "Webhook secret not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify Stripe signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      return new Response(
        JSON.stringify({ error: `Webhook Error: ${err.message}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Event received: ${event.type}`);

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.user_id;
        
        if (!userId) {
          console.error("No user_id found in session metadata");
          break;
        }

        // Get subscription details to determine the plan
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        const priceId = subscription.items.data[0].price.id;
        
        // Map price ID to plan name
        let plan;
        switch (priceId) {
          case "price_1RDx8YP1PhXRWWHLMyCZSDJf":
            plan = "starter";
            break;
          case "price_1RDx9BP1PhXRWWHLJyNv8nuW":
            plan = "growth";
            break;
          default:
            // If we can't identify the price, default to starter
            plan = "starter";
        }

        // Update user profile with plan
        const { error: profileError } = await supabase
          .from("user_profiles")
          .upsert({
            user_id: userId,
            plan,
            updated_at: new Date().toISOString(),
          });

        if (profileError) {
          console.error("Error updating user profile:", profileError);
        }

        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        // Find user by customer ID
        const { data: profiles, error: profileError } = await supabase
          .from("user_profiles")
          .select("user_id")
          .eq("stripe_customer_id", customerId);
        
        if (profileError) {
          console.error("Error finding user profile:", profileError);
          break;
        }
        
        if (profiles && profiles.length > 0) {
          const userId = profiles[0].user_id;
          
          // Downgrade user to free plan
          const { error: updateError } = await supabase
            .from("user_profiles")
            .update({
              plan: "free",
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId);
          
          if (updateError) {
            console.error("Error downgrading user plan:", updateError);
          }
        }
        
        break;
      }
      
      // Handle other relevant events
      // ...
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

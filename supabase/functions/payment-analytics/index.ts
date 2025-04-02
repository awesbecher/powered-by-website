
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Stripe API key
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("Stripe secret key is not configured");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Parse date range parameters
    const { startDate, endDate } = await req.json();
    const start = startDate ? new Date(startDate) : new Date();
    start.setMonth(start.getMonth() - 1); // Default to last 30 days
    const end = endDate ? new Date(endDate) : new Date();
    
    // Convert to Unix timestamps for Stripe
    const startTimestamp = Math.floor(start.getTime() / 1000);
    const endTimestamp = Math.floor(end.getTime() / 1000);
    
    console.log(`Fetching payment analytics from ${start.toISOString()} to ${end.toISOString()}`);

    // Fetch payment intents
    const paymentIntents = await stripe.paymentIntents.list({
      created: {
        gte: startTimestamp,
        lte: endTimestamp,
      },
      limit: 100,
    });

    // Calculate total payments, success rate, etc.
    const totalPayments = paymentIntents.data.length;
    const successfulPayments = paymentIntents.data.filter(pi => pi.status === 'succeeded').length;
    const failedPayments = paymentIntents.data.filter(pi => pi.status === 'canceled' || pi.status === 'requires_payment_method').length;
    const paymentsByMethod = {};
    const totalAmount = paymentIntents.data.reduce((sum, pi) => pi.status === 'succeeded' ? sum + pi.amount : sum, 0) / 100;

    // Calculate payment methods breakdown
    for (const pi of paymentIntents.data) {
      if (pi.payment_method_types && pi.payment_method_types.length > 0) {
        for (const method of pi.payment_method_types) {
          paymentsByMethod[method] = (paymentsByMethod[method] || 0) + 1;
        }
      }
    }

    // Get refunds
    const refunds = await stripe.refunds.list({
      created: {
        gte: startTimestamp,
        lte: endTimestamp,
      },
      limit: 100,
    });
    
    const totalRefunds = refunds.data.length;
    const refundAmount = refunds.data.reduce((sum, refund) => sum + refund.amount, 0) / 100;

    // Compile analytics data
    const analyticsData = {
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
      overview: {
        totalPayments,
        successfulPayments,
        failedPayments,
        successRate: totalPayments > 0 ? (successfulPayments / totalPayments) * 100 : 0,
        totalAmount,
        currency: 'usd',
      },
      paymentMethods: paymentsByMethod,
      refunds: {
        count: totalRefunds,
        amount: refundAmount,
      }
    };
    
    console.log("Analytics data compiled");

    return new Response(JSON.stringify(analyticsData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error generating payment analytics:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Error response helper function
const errorResponse = (message: string, status = 500, details?: any) => {
  const error = { message, ...(details && { details }) };
  console.error("Error:", error);
  return new Response(JSON.stringify({ error }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (e) {
      return errorResponse("Invalid request body", 400);
    }

    const { amount, customerName, customerEmail, productName, paymentMethods = ["card"] } = requestBody;
    
    // Validate required parameters
    if (!amount || !customerEmail) {
      return errorResponse("Missing required parameters: amount and customerEmail are required", 400);
    }
    
    if (isNaN(amount) || amount <= 0) {
      return errorResponse("Invalid amount: must be a positive number", 400);
    }
    
    console.log("Payment request received:", { 
      amount, 
      customerName, 
      customerEmail, 
      productName,
      paymentMethods 
    });
    
    // Initialize Stripe
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      return errorResponse("Stripe secret key is not configured", 500);
    }

    try {
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2023-10-16",
      });

      // Get origin for success/cancel URLs
      const origin = req.headers.get("origin") || "https://yoursite.com";
      console.log("Using origin for redirects:", origin);

      // Validate supported payment methods
      const supportedPaymentMethods = ["card", "apple_pay", "google_pay", "alipay"];
      const validPaymentMethods = paymentMethods.filter(method => 
        supportedPaymentMethods.includes(method)
      );
      
      if (validPaymentMethods.length === 0) {
        validPaymentMethods.push("card"); // Default to card if none provided or all invalid
      }
      
      // Define automatic tax settings if needed
      const automaticTax = {
        enabled: false
      };

      // Create a checkout session with enhanced options
      const session = await stripe.checkout.sessions.create({
        payment_method_types: validPaymentMethods,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: productName || "Payment",
                description: `Payment for ${productName || "services"}`,
              },
              unit_amount: Math.round(amount * 100), // Stripe uses cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: customerEmail,
        client_reference_id: customerName,
        success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment-cancelled`,
        automatic_tax: automaticTax,
        // Enable receipt emails from Stripe
        receipt_email: customerEmail,
        // Allow promotion codes to be applied
        allow_promotion_codes: true,
        // Add metadata for better tracking
        metadata: {
          customerName: customerName || "Guest",
          productName: productName || "Payment",
          source: "Website Payment"
        },
        // Add shipping options if needed
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB', 'AU'],
        },
        // Optional: Custom branding
        payment_intent_data: {
          description: `Payment for ${productName || "services"}`,
          // Optional: Set up for future payments
          setup_future_usage: 'off_session',
        },
      });

      console.log("Stripe session created, redirecting to:", session.url);

      return new Response(JSON.stringify({ 
        url: session.url,
        sessionId: session.id
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } catch (stripeError) {
      // Handle Stripe-specific errors
      let errorMessage = "Payment processing error";
      let statusCode = 500;
      
      if (stripeError.type === 'StripeCardError') {
        errorMessage = "Your card was declined";
        statusCode = 400;
      } else if (stripeError.type === 'StripeInvalidRequestError') {
        errorMessage = "Invalid payment request";
        statusCode = 400;
      } else if (stripeError.type === 'StripeAPIError') {
        errorMessage = "Stripe API error";
      } else if (stripeError.type === 'StripeConnectionError') {
        errorMessage = "Connection to Stripe failed";
      } else if (stripeError.type === 'StripeAuthenticationError') {
        errorMessage = "Authentication with Stripe failed";
      }
      
      return errorResponse(errorMessage, statusCode, {
        type: stripeError.type,
        code: stripeError.code
      });
    }
  } catch (error) {
    return errorResponse("Error creating payment session: " + error.message);
  }
});

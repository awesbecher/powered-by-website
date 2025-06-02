
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { accessCustomerPortal } from "./utils/portalAccess";

// Import form section components
import CustomerInfoSection from "./FormSections/CustomerInfoSection";
import PaymentDetailsSection from "./FormSections/PaymentDetailsSection";
import ReceiptOptionSection from "./FormSections/ReceiptOptionSection";
import PaymentMethodsSection from "./FormSections/PaymentMethodsSection";
import FormActions from "./FormSections/FormActions";
import ErrorDisplay from "./FormSections/ErrorDisplay";

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1." }),
  receiveReceipt: z.boolean().default(true),
  paymentMethods: z.array(z.string()).default(["card"]),
  currency: z.string().default("usd")
});

interface PaymentFormProps {
  productFromUrl: string | null;
  amountFromUrl: string | null;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ productFromUrl, amountFromUrl }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Default amount if not provided in URL
  const defaultAmount = 100;
  
  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: amountFromUrl ? parseInt(amountFromUrl) : defaultAmount,
      receiveReceipt: true,
      paymentMethods: ["card"],
      currency: "usd"
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    
    try {
      toast.info("Preparing checkout session...");
      console.log("Submitting payment form:", values);
      
      // Call the Supabase Edge Function to create a Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          amount: values.amount,
          customerName: values.name,
          customerEmail: values.email,
          productName: productFromUrl || 'Custom Payment',
          paymentMethods: values.paymentMethods,
          currency: values.currency,
          receiveReceipt: values.receiveReceipt
        }
      });

      if (error) {
        console.error("Stripe function error:", error);
        throw new Error(error.message || "Payment processing error");
      }

      if (!data?.url) {
        throw new Error('No checkout URL returned');
      }
      
      // Store session ID for reference
      if (data.sessionId) {
        localStorage.setItem('lastPaymentSessionId', data.sessionId);
      }

      toast.success("Redirecting to secure payment page...");
      console.log("Redirecting to:", data.url);
      
      // Add a slight delay before redirect to ensure toast is shown
      setTimeout(() => {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      }, 1000);
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || "There was an error processing your payment.");
      toast.error(error.message || "There was an error processing your payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to access customer portal
  const handlePortalAccess = async () => {
    const email = form.getValues('email');
    setLoading(await accessCustomerPortal(email) || false);
  };
  
  return (
    <>
      <ErrorDisplay error={error} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomerInfoSection form={form} />
          <PaymentDetailsSection form={form} defaultAmount={defaultAmount} />
          <ReceiptOptionSection form={form} />
          <PaymentMethodsSection form={form} />
          <FormActions 
            form={form} 
            loading={loading} 
            onPortalAccess={handlePortalAccess} 
          />
        </form>
      </Form>
    </>
  );
};

export default PaymentForm;

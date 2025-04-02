
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1." }),
  receiveReceipt: z.boolean().default(true),
  paymentMethods: z.array(z.string()).default(["card"]),
  currency: z.string().default("usd")
});

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get parameters from URL
  const amountFromUrl = searchParams.get('amount');
  const productFromUrl = searchParams.get('product');
  
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
  const accessCustomerPortal = async () => {
    const email = form.getValues('email');
    
    if (!email) {
      toast.error("Please enter your email address to access the customer portal");
      return;
    }
    
    setLoading(true);
    
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto">
          <Card className="p-6 bg-white/5 backdrop-blur-lg border border-white/10">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/6402ce08-e286-4857-864a-8d835bfaa5d3.png" 
                alt="Payment Logo" 
                className="h-24 w-auto"
              />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-6 text-center">
              {productFromUrl ? `Payment for ${productFromUrl}` : 'Complete Your Payment'}
            </h1>
            
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 p-3 rounded-md mb-4 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email for Invoice</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Amount</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder={defaultAmount.toString()} 
                            {...field} 
                            readOnly={true}
                            className="bg-gray-700 cursor-not-allowed"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Currency</FormLabel>
                        <Select 
                          defaultValue={field.value} 
                          onValueChange={field.onChange}
                          disabled={true}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-700 cursor-not-allowed">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="receiveReceipt"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-[#6342ff]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white text-sm font-normal">
                          Send receipt email after payment
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentMethods"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-white">Payment Methods</FormLabel>
                      <div className="bg-white/10 p-3 rounded-md text-sm text-white/80">
                        All major payment methods are supported including credit/debit cards, Apple Pay, Google Pay, and more.
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#6342ff] hover:bg-[#7e5fff] font-bold text-white" 
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </Button>
                
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={accessCustomerPortal}
                    className="text-[#a87cff] hover:text-white text-xs underline transition-colors"
                  >
                    Access customer portal for existing payments
                  </button>
                </div>
                
                <div className="mt-2 text-center flex justify-center items-center space-x-2">
                  <span className="text-white/50 text-xs">Secured by</span>
                  <svg className="h-4" viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 10.4267C60 4.65992 55.6133 0 50.0859 0C44.5535 0 40.172 4.65992 40.172 10.4267C40.172 16.1883 44.5535 20.8483 50.0859 20.8483C55.6133 20.8483 60 16.1883 60 10.4267ZM7.95117 1.25975H12.7578V14.5113H7.95117V1.25975ZM38.4141 6.43061L37.5791 2.71729L33.4922 2.72099V14.5113H38.0859V6.96358C39.3268 6.0918 40.1641 6.6866 40.3711 8.31259H44.7571C44.8633 5.11972 42.0012 3.60062 38.4141 6.43061ZM30.9961 5.89394C30.0236 4.76332 28.7383 4.16059 27.2461 4.16059C26.1769 4.16059 25.2038 4.45966 24.3281 5.0622C23.4551 5.66493 22.7758 6.53058 22.2969 7.66121H22.207C21.9141 6.5677 21.4117 5.71573 20.7031 5.0622C19.9943 4.40867 19.0572 4.08519 17.8906 4.08519C16.9828 4.08519 16.1846 4.33894 15.4961 4.84275C14.8066 5.34656 14.2858 6.03936 13.9219 6.91862V4.39076H9.42968V14.5113H14.1943V9.6347C14.1943 8.90232 14.3962 8.32659 14.7969 7.90949C15.1978 7.4924 15.6926 7.28385 16.2695 7.28385C16.8242 7.28385 17.2734 7.49979 17.6094 7.93797C17.9453 8.36986 18.1172 8.91654 18.1172 9.57748V14.5113H22.9336V9.6347C22.9336 8.90232 23.1224 8.32659 23.5 7.90949C23.8779 7.4924 24.366 7.28385 24.9648 7.28385C25.5195 7.28385 25.9661 7.49979 26.3047 7.93797C26.6432 8.37725 26.8125 8.92394 26.8125 9.57748V14.5113H31.5107V8.54034C31.5107 7.43334 31.0107 6.30272 30.9961 5.89394V5.89394ZM3.50391 10.4267C3.50391 11.1137 3.39256 11.8118 3.17383 12.5263C2.95313 13.2372 2.60677 13.9466 2.13086 14.6487L0 17.3158H4.44531C5.23631 15.9842 5.5 14.6487 5.5 11.4559C5.5 10.3819 6.14811 9.57748 7.26172 9.45977C6.99416 4.50108 5.26758 1.25975 0 1.25975H0V5.7904C2.33204 5.7904 3.50391 7.30949 3.50391 10.4267V10.4267Z" fill="white"/>
                  </svg>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;

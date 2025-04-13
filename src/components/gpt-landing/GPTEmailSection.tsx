
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidEmail } from "@/utils/emailValidation";
import { toast } from "sonner";

interface GPTEmailSectionProps {
  initialLoad: boolean;
}

export const GPTEmailSection: React.FC<GPTEmailSectionProps> = ({ initialLoad }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Log this event using our new log-usage endpoint
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-usage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          event: "email-subscription",
          message: "User subscribed to GPT updates",
          userEmail: email
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }
      
      toast.success("Thanks for subscribing! We'll be in touch soon.");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className={`max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 transition-all duration-1000 ease-out transform delay-600 ${
        initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Stay Updated
        </h2>
        
        <p className="text-gray-300 text-center mb-8">
          Leave your email to get updates or request custom builds for your specific needs
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <Input 
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#9b87f5] hover:bg-[#8a75e3] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe for Updates"}
          </Button>
        </form>
      </div>
    </section>
  );
};

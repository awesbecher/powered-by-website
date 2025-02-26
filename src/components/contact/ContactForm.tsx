
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReCAPTCHA from "react-google-recaptcha";

// Constants
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

// List of common personal email domains
const personalEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'mail.com',
  'zoho.com',
  'yandex.com',
  'live.com',
  'msn.com'
];

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    company: "",
    reason: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const isPersonalEmail = (email: string) => {
    const domain = email.split('@')[1];
    return personalEmailDomains.includes(domain?.toLowerCase());
  };

  const isValidEmail = (email: string) => {
    // RFC 5322 compliant email regex
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Check for common mistakes
    if (email.includes('..')) return false; // Double dots
    if (email.startsWith('.') || email.endsWith('.')) return false; // Leading/trailing dots
    if (email.split('@').length !== 2) return false; // Multiple @ symbols
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      toast({
        title: "Verification required",
        description: "Please complete the reCAPTCHA verification before sending.",
        variant: "destructive"
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (isPersonalEmail(formData.email)) {
      toast({
        title: "Invalid email domain",
        description: "Please use your corporate email address. Personal email domains are not accepted.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: { ...formData, captchaToken }
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible."
      });

      setFormData({
        name: "",
        email: "",
        title: "",
        company: "",
        reason: "",
        message: ""
      });
      setCaptchaToken(null);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <div className="mt-8 bg-neutral-900/50 p-8 rounded-xl backdrop-blur">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <Input id="name" value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} className="bg-neutral-800 border-neutral-700 text-white" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <Input 
            id="email" 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} 
            className="bg-neutral-800 border-neutral-700 text-white" 
            required 
            placeholder="your-email@company.com"
          />
          <p className="text-sm text-gray-400 mt-1">Please use your corporate email address</p>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <Input 
            id="title" 
            value={formData.title} 
            onChange={e => setFormData({
              ...formData,
              title: e.target.value
            })} 
            className="bg-neutral-800 border-neutral-700 text-white" 
            required 
            placeholder="e.g. CEO, CTO, Product Manager"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
            Company
          </label>
          <Input id="company" value={formData.company} onChange={e => setFormData({
            ...formData,
            company: e.target.value
          })} className="bg-neutral-800 border-neutral-700 text-white" />
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
            Reason for Scheduling Meeting?
          </label>
          <select
            id="reason"
            value={formData.reason}
            onChange={e => setFormData({
              ...formData,
              reason: e.target.value
            })}
            className="w-full rounded-md bg-neutral-800 border-neutral-700 text-white p-3"
            required
          >
            <option value="">Select a reason</option>
            <option value="specific">I have a specific AI project need</option>
            <option value="curious">I'm curious about AI agents - Just educating myself</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            What's your vision? How would you like to use AI agents in your business?
          </label>
          <textarea id="message" rows={4} value={formData.message} onChange={e => setFormData({
            ...formData,
            message: e.target.value
          })} className="w-full rounded-md bg-neutral-800 border-neutral-700 text-white p-3" required />
        </div>
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            theme="dark"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-accent hover:bg-accent-dark text-white py-6"
          disabled={isSubmitting || !captchaToken}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};

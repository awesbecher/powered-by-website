
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReCAPTCHA from "react-google-recaptcha";

// Constants
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // Replace this with your actual site key

const Contact = () => {
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
  const [initialLoad, setInitialLoad] = useState(true);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

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

  const isPersonalEmail = (email: string) => {
    const domain = email.split('@')[1];
    return personalEmailDomains.includes(domain?.toLowerCase());
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Content */}
      <div className="relative z-10 pt-36">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center">
            <h1 
              className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 transition-all duration-1000 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              Book a Free Consultation Meeting
            </h1>
            
            <p 
              className={`mt-4 text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-tight font-bold transition-all duration-1000 delay-300 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              Ready to put AI agents to work? Book a Free Consultation meeting with our Solutions Design Leader. In this 30-minute meetings, we will review your AI agent project needs or help you build a vision for a project.
            </p>
          </div>

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
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Contact;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible."
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        message: ""
      });
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

  return <div className="min-h-screen bg-[#222222] pt-24">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-20xl font-bold text-white text-center mb-4">Let's meet!</h1>
        <p className="text-gray-300 text-center mb-8 text-lg">Ready to put AI agents to work? Book a consultation with our Solutions Design Leader (<span className="text-[#9b87f5] font-bold">a human!</span>) by filing out the form below. Or talk to our AI agent about how we can help by clicking the button above.</p>
        <div className="bg-neutral-900/50 p-8 rounded-xl backdrop-blur">
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
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                Company
              </label>
              <Input id="company" value={formData.company} onChange={e => setFormData({
              ...formData,
              company: e.target.value
            })} className="bg-neutral-800 border-neutral-700 text-white" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Describe your vision. What would you like to use AI agents in your business?
              </label>
              <textarea id="message" rows={4} value={formData.message} onChange={e => setFormData({
              ...formData,
              message: e.target.value
            })} className="w-full rounded-md bg-neutral-800 border-neutral-700 text-white p-3" required />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent-dark text-white py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>;
};

export default Contact;

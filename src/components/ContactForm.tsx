
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isPersonalEmail } from "@/utils/emailValidation";

const ContactForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    if (newEmail && isPersonalEmail(newEmail)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please use your business email address.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    
    if (!name || !email || !company || !phone || !message) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all fields.",
      });
      return;
    }

    if (isPersonalEmail(email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please use your business email address.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Sending email via Supabase function...');
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, company, phone, message },
      });

      if (error) throw error;

      console.log('Email sent successfully, preparing to navigate...');
      
      // Clear form
      setName('');
      setEmail('');
      setCompany('');
      setPhone('');
      setMessage('');
      
      // Show success toast before navigation
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! Redirecting you now...",
      });

      // Add a small delay before navigation to ensure the toast is seen
      setTimeout(() => {
        console.log('Navigating to thank you page...');
        navigate('/thank-you');
      }, 1500);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>
      <div>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Your Business Email"
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>
      <div>
        <Input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company Name"
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>
      <div>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Your Message"
          className="w-full rounded-md bg-white/5 border border-white/10 text-white placeholder:text-gray-400 px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
      <div>
        <Button 
          type="submit" 
          className="w-full bg-accent hover:bg-accent-dark text-white transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;


import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MailCheck } from 'lucide-react';
import { toast } from 'sonner';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      toast.success('Thank you for subscribing!');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-[#2f1c4a] to-[#1a0b2e] rounded-xl overflow-hidden h-full shadow-lg border border-[#9b87f5]/20 p-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#9b87f5]/20 mb-4">
        <MailCheck className="h-8 w-8 text-[#9b87f5]" />
      </div>
      
      <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
      
      <p className="text-gray-300 mb-6">
        Get the latest AI news, product updates, and exclusive content delivered straight to your inbox.
      </p>
      
      {isSubscribed ? (
        <div className="bg-[#9b87f5]/10 p-4 rounded-lg text-center">
          <MailCheck className="h-6 w-6 text-[#9b87f5] mx-auto mb-2" />
          <p className="text-white">Thanks for subscribing!</p>
          <p className="text-gray-300 text-sm mt-2">You'll receive our next newsletter soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-4">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/20 text-white"
            required
          />
          <Button 
            type="submit" 
            className="w-full bg-[#9b87f5] hover:bg-[#8976d9]"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      )}
      
      <p className="text-xs text-gray-400 mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

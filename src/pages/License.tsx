
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Star, Zap, Shield, Crown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LicenseProductCard } from "@/components/insurance/LicenseProductCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const License = () => {
  const [customerId, setCustomerId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCustomerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 8 characters
    if (/^\d*$/.test(value)) {
      setCustomerId(value.slice(0, 8));
    }
  };

  const handleCall = async () => {
    if (!phoneNumber) {
      toast({
        variant: "destructive",
        title: "Please enter your phone number",
        description: "A phone number is required to connect with a sales representative."
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('initiate-call', {
        body: { 
          phoneNumber: phoneNumber.replace(/\D/g, ''),
          type: 'license',
          metadata: {
            customerId
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Call initiated!",
        description: "You will receive a call shortly from a RightBloom sales representative."
      });
      setIsOpen(false);
      setPhoneNumber("");
      navigate('/');
    } catch (error) {
      console.error('Error initiating call:', error);
      toast({
        variant: "destructive",
        title: "Error initiating call",
        description: "There was an error initiating your call. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the customer ID is exactly 8 digits
  const isValidCustomerId = customerId.length === 8;

  const licenseOptions = [{
    title: "Essentials",
    description: "Essential features for getting started",
    price: "$25 USD/user/month",
    icon: Star,
    features: ["Basic features included", "Standard support", "Billed annually", "Perfect for small teams"]
  }, {
    title: "Sales Professional",
    description: "Optimized for sales teams",
    price: "$75 USD/user/month",
    icon: Zap,
    features: ["All Essentials features", "Advanced sales tools", "Priority support", "Billed annually"]
  }, {
    title: "Service Professional",
    description: "Designed for service teams",
    price: "$125 USD/user/month",
    icon: Shield,
    features: ["All Essentials & Sales features", "Enterprise service desk tools", "Priority support", "Billed annually"]
  }, {
    title: "Enterprise",
    description: "Complete solution for large organizations",
    price: "$165 USD/user/month",
    icon: Crown,
    features: ["All Professional features", "Enterprise-grade security", "24/7 premium support", "Billed annually"]
  }];

  return <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="absolute top-8 right-8">
        <img src="/lovable-uploads/57b14d49-eab1-4dd2-827d-dceb363f5514.png" alt="RightBloom Logo" className="h-10 w-auto" />
      </div>

      {/* Back button */}
      <Link to="/" className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors">
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-7xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          License Upgrade
        </h1>

        {/* License Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {licenseOptions.map(option => <LicenseProductCard key={option.title} title={option.title} description={option.description} price={option.price} features={option.features} icon={option.icon} />)}
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-300 mb-4">A RightBloom Sales rep is ready to help you upgrade your license. To get started, we will need the following information:</p>

          <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md">
                <Input type="text" inputMode="numeric" pattern="\d*" placeholder="Enter your RightBloom Customer ID # (enter any 8 digits):" value={customerId} onChange={handleCustomerIdChange} maxLength={8} className="text-center bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <button 
                  onClick={() => setIsOpen(true)} 
                  disabled={!isValidCustomerId} 
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Speak To A Sales Rep
                  <Phone className="h-4 w-4" />
                </button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enter your phone number to speak with a sales representative</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4 pt-4">
                    <Input 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      value={phoneNumber} 
                      onChange={e => setPhoneNumber(e.target.value)} 
                      className="text-lg" 
                    />
                    <button 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-md disabled:opacity-50"
                      onClick={handleCall}
                      disabled={isLoading}
                    >
                      {isLoading ? "Initiating call..." : "Call Me"}
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default License;

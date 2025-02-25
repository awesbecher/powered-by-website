
import { Bot, Network, MessageSquare, BarChart, Phone, DollarSign, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { initiateVogentCall } from "@/services/vogentService";

const License = () => {
  const navigate = useNavigate();
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    if (!value) return "";
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
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
      await initiateVogentCall(phoneNumber, 'saas');
      setPhoneNumber("");
      toast({
        title: "Call initiated",
        description: "A sales representative will call you shortly."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error.message || "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-20 text-white hover:text-purple-400 transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="font-medium">Back</span>
      </button>

      {/* Logo */}
      <div className="absolute top-24 right-8 z-20">
        <img 
          src="/lovable-uploads/8505af38-6a90-44dc-b6bc-554d254475ea.png"
          alt="RightBloom"
          className="h-12 w-auto"
        />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-[100vh]">
        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col items-center pt-40">
          <h1 className="text-4xl md:text-5xl font-bold text-center max-w-4xl px-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            Transform Your Sales Outreach & Customer Experience with{' '}
            <Link to="/blog/understanding-ai-agents" className="underline underline-offset-4 hover:text-purple-300 transition-colors">
              AI Agents
            </Link>
          </h1>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="min-h-[45vh]"></div>
          <div className="flex flex-col items-center justify-center gap-12 pb-20">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 pt-10 max-w-2xl">
              <p className="text-2xl text-white text-center leading-tight">
                RightBloom delivers cutting-edge AI agent solutions that automate and enhance your sales and customer service operations, helping innovative companies scale their business efficiently. View our products and pricing below. You can{' '}
                <button 
                  onClick={() => setIsCallDialogOpen(true)}
                  className="text-purple-400 hover:text-purple-300 transition-colors font-semibold underline underline-offset-2"
                >
                  speak
                </button>
                {' '}to a live Sales Rep to learn more or get a customized quote.
              </p>
            </div>
            
            <div className="flex flex-row items-center gap-4">
              <Dialog open={isPricingDialogOpen} onOpenChange={setIsPricingDialogOpen}>
                <DialogTrigger asChild>
                  <button 
                    className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-10 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg w-[280px] whitespace-nowrap"
                  >
                    View Products & Pricing
                    <DollarSign className="w-5 h-5" />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl mb-6">RightBloom Pricing Packages</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-purple-400">Essentials Package: $25/user/month</h3>
                      <p className="text-gray-500">This is our base package providing core functionalities of the RightBloom software, but lacks advanced options like extensive reporting, integrations, or high user limits.</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-purple-400">Sales Package: $75/user/month</h3>
                      <p className="text-gray-500">This package provides core functionalities of the RightBloom software AND includes advanced AI sales automation capabilities and includes extensive reporting and extensive API integrations to SalesForce, Hubspot, and others.</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-purple-400">Service Package: $125/user/month</h3>
                      <p className="text-gray-500">This package provides the core functionalities of the RightBloom AI ADR capabilities provided in the Sales Package plus additional software capabilities to automate customer support and service communication & workflows with live support provided during business hours.</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-purple-400">Enterprise Package: $165/user/month</h3>
                      <p className="text-gray-500">This package provides all of the features in our Sales & Service packages with unlimited API integrations plus 24-by-7 live customer support.</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
                <DialogTrigger asChild>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg w-[280px] whitespace-nowrap">
                    Speak to a Sales Rep
                    <Phone className="w-5 h-5" />
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Enter your phone number to speak with a sales representative</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0 bg-gray-800 p-2 rounded border border-gray-700">
                        +1
                      </div>
                      <Input 
                        type="tel" 
                        placeholder="(555) 123-4567"
                        value={formatPhoneNumber(phoneNumber)}
                        onChange={handlePhoneNumberChange}
                        className="flex-1 text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => setIsCallDialogOpen(false)}
                        className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                        onClick={handleCall}
                        disabled={isLoading}
                      >
                        {isLoading ? "Initiating call..." : "Call Me"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <Bot className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">AI Agents</h3>
                <p className="text-gray-300 text-sm">Intelligent automation for customer interactions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <Network className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">Smart Routing</h3>
                <p className="text-gray-300 text-sm">Seamless request distribution and handling</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <MessageSquare className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-300 text-sm">Round-the-clock automated assistance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <BarChart className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">Analytics</h3>
                <p className="text-gray-300 text-sm">Deep insights into customer interactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default License;

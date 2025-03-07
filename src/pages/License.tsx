
import { Bot, Network, MessageSquare, BarChart, Phone, DollarSign, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";

import ActiveCallDialog from "@/components/license/ActiveCallDialog";
import CallConsentDialog from "@/components/license/CallConsentDialog";
import PricingDialog from "@/components/license/PricingDialog";
import FeatureCard from "@/components/license/FeatureCard";

const License = () => {
  const navigate = useNavigate();
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      setIsCallActive(false);
      navigate('/demo');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to end call",
        description: error.message || "Please try again later."
      });
    }
  };

  const handleCall = async () => {
    setIsLoading(true);
    try {
      await initiateVapiCall("d7a8b20b-ca41-474e-bef2-4ca993f7de97");
      setIsCallActive(true);
      setIsCallDialogOpen(false);
      toast({
        title: "Call initiated",
        description: "You are now connected with Christina Bell."
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const features = [
    { 
      icon: Bot, 
      title: "AI Agents", 
      description: "Intelligent automation for customer interactions", 
      iconColor: "text-purple-400" 
    },
    { 
      icon: Network, 
      title: "Smart Routing", 
      description: "Seamless request distribution and handling", 
      iconColor: "text-pink-400" 
    },
    { 
      icon: MessageSquare, 
      title: "24/7 Support", 
      description: "Round-the-clock automated assistance", 
      iconColor: "text-blue-400" 
    },
    { 
      icon: BarChart, 
      title: "Analytics", 
      description: "Deep insights into customer interactions", 
      iconColor: "text-green-400" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-20 text-white hover:text-purple-400 transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="font-medium">Back</span>
      </button>

      <div className="flex justify-center w-full absolute top-24 z-20">
        <img 
          src="/lovable-uploads/8505af38-6a90-44dc-b6bc-554d254475ea.png"
          alt="RightBloom"
          className="h-12 w-auto"
        />
      </div>

      <ActiveCallDialog 
        isOpen={isCallActive}
        onOpenChange={(open) => !open && handleEndCall()}
        onEndCall={handleEndCall}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />

      <CallConsentDialog
        isOpen={isCallDialogOpen}
        onOpenChange={setIsCallDialogOpen}
        onConfirm={handleCall}
        isLoading={isLoading}
      />

      <PricingDialog 
        isOpen={isPricingDialogOpen} 
        onOpenChange={setIsPricingDialogOpen}
      />

      <div className="relative min-h-[100vh]">
        <div className="absolute inset-0 flex flex-col items-center pt-40">
          <h1 className="text-4xl md:text-5xl font-bold text-center max-w-4xl px-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            <span>Transform Your Sales Outreach & Customer Experience with{' '}</span>
            <Link to="/blog/understanding-ai-agents" className="underline underline-offset-4 hover:text-purple-300 transition-colors">
              AI Agents
            </Link>
          </h1>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="min-h-[45vh]"></div>
          <div className="flex flex-col items-center justify-center gap-12 pb-20">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 pt-10 max-w-2xl">
              <p className="text-2xl text-white text-center leading-tight">
                RightBloom delivers cutting-edge AI agent solutions that automate and enhance your sales and customer service operations, helping innovative companies scale their business efficiently. View our products and pricing below. You can speak to a live Sales Rep to learn more or get a customized quote.
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
              </Dialog>
              
              <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
                <DialogTrigger asChild>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg w-[280px] whitespace-nowrap">
                    Speak to a Sales Rep
                    <Phone className="w-5 h-5" />
                  </button>
                </DialogTrigger>
              </Dialog>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconColor={feature.iconColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default License;

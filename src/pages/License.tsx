
import { Bot, Network, MessageSquare, BarChart } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import Navbar from "@/components/layout/Navbar";

import ActiveCallDialog from "@/components/license/ActiveCallDialog";
import CallConsentDialog from "@/components/license/CallConsentDialog";
import PricingDialog from "@/components/license/PricingDialog";
import FeatureCard from "@/components/license/FeatureCard";
import LicenseHeader from "@/components/license/LicenseHeader";
import LicenseHero from "@/components/license/LicenseHero";

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
      <Navbar />

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <LicenseHeader />
        
        <div className="py-10 sm:py-14">
          <div className="max-w-5xl mx-auto">
            <LicenseHero 
              onShowCallDialog={() => setIsCallDialogOpen(true)}
              onShowPricingDialog={() => setIsPricingDialogOpen(true)}
              isLoading={isLoading}
            />
            
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Features</h2>
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
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
    </div>
  );
};

export default License;

import { Bot, Network, MessageSquare, BarChart, Phone, DollarSign, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";

const License = () => {
  const navigate = useNavigate();
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-20 text-white hover:text-purple-400 transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="font-medium">Back</span>
      </button>

      <div className="absolute top-24 right-8 z-20">
        <img 
          src="/lovable-uploads/8505af38-6a90-44dc-b6bc-554d254475ea.png"
          alt="RightBloom"
          className="h-12 w-auto"
        />
      </div>

      <Dialog open={isCallActive} onOpenChange={(open) => !open && handleEndCall()}>
        <DialogContent className="bg-[#222222] text-white border-gray-800">
          <div className="flex items-start space-x-4 mb-4">
            <img
              src="/lovable-uploads/0d1c3dc0-7aad-4ddd-8b25-1edf45232f70.png"
              alt="Christina Bell"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <DialogHeader className="flex-1">
              <DialogTitle>Your call with Christina Bell is in progress</DialogTitle>
            </DialogHeader>
          </div>
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-gray-300">
              You are currently in a voice conversation with Christina Bell from RightBloom's sales team. You can end the call at any time by clicking the button below.
            </p>
            <Button 
              onClick={handleEndCall}
              className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white font-bold"
            >
              End Call
            </Button>
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
          <div className="flex items-start space-x-4 mb-4">
            <img
              src="/lovable-uploads/0d1c3dc0-7aad-4ddd-8b25-1edf45232f70.png"
              alt="Christina Bell"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <DialogHeader className="flex-1">
              <DialogTitle>Start Voice Chat with Christina Bell on RightBloom's Sales Team</DialogTitle>
            </DialogHeader>
          </div>
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-gray-300">
              You'll be able to have a voice conversation with Christina directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
            </p>
            <p className="text-gray-300 text-sm">
              By clicking "Start Voice Chat", you consent to having a voice conversation with RightBloom's sales team. You can end the conversation at any time.
            </p>
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
                {isLoading ? "Initiating call..." : "Start Voice Chat"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
                    <DialogTitle>Click below to speak with a sales representative</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4 pt-4">
                    <p className="text-gray-300">
                      You will be connected to a RightBloom sales representative through your browser. Please ensure your microphone is enabled.
                    </p>
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
                        {isLoading ? "Initiating call..." : "Start Call"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

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

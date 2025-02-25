import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { ValuesSection } from "@/components/home/ValuesSection";
import { BlogSection } from "@/components/home/BlogSection";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import AIAgentIllustration from "@/components/home/AIAgentIllustration";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    return () => {
      stopVapiCall();
    };
  }, []);

  const handleStartCall = async () => {
    setIsSubmitting(true);
    try {
      await initiateVapiCall();
      toast({
        title: "Voice Chat Started",
        description: "You can now speak with our AI Agent through your browser.",
      });
      setShowDialog(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start voice chat. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="absolute top-6 left-6 lg:left-8">
        <img 
          src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
          alt="Parlar Logo"
          className="w-[192px] lg:w-[288px] h-auto"
        />
      </div>

      <HeroSection initialLoad={initialLoad} />

      <div className="relative z-10 mt-12 mb-12">
        <FeaturesGrid />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center px-6 mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl">
          <Button
            asChild
            className="relative z-20 text-white bg-[#6E59A5] hover:bg-[#6E59A5]/80 px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            <Link to="/blog/understanding-ai-agents">
              What's an AI agent?
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            className="relative z-20 bg-accent hover:bg-accent-dark text-white px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            <Link to="/contact">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            onClick={() => setShowDialog(true)}
            className="relative z-20 bg-white hover:bg-gray-100 text-accent px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            Talk to an AI Agent Now
            <Phone className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#222222] text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              Start Voice Chat with AI Agent
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              You'll be able to have a voice conversation with our AI Agent directly through your browser. Please ensure your microphone is enabled.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 pt-4">
            <p className="text-sm text-gray-300">
              By clicking "Start Voice Chat", you consent to having a voice conversation with our AI Agent. You can end the conversation at any time.
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleStartCall}
                disabled={isSubmitting}
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
              >
                {isSubmitting ? "Starting..." : "Start Voice Chat"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="relative z-10 -mt-48 mb-0 flex justify-center">
        <div className="w-full max-w-xl">
          <AIAgentIllustration />
        </div>
      </div>

      <ValuesSection />
      <BlogSection />
      <ClosingCTA />

      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Index;

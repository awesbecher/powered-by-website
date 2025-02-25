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
import { Input } from "@/components/ui/input";
import { initiateVapiCall } from "@/services/vapiService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setInitialLoad(false);
  }, []);

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

  const handlePhoneSubmit = async () => {
    setIsSubmitting(true);
    try {
      await initiateVapiCall(phoneNumber);
      toast({
        title: "Call Initiated",
        description: "Our AI Agent will call you shortly.",
      });
      setShowDialog(false);
      setPhoneNumber('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate call. Please try again.",
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
              Talk to an AI Agent
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Talk with our AI Agent to learn more about us. Enter your phone # below and it will call you shortly.
            </DialogDescription>
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
                onClick={() => setShowDialog(false)}
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePhoneSubmit}
                disabled={isSubmitting || !phoneNumber.trim()}
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
              >
                {isSubmitting ? "Processing..." : "Click to start your call"}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 -mt-48">
        <h2 className="relative text-5xl font-bold text-white mb-4 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pt-0 pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">
          Our Approach:
        </h2>
      </div>
      
      <ValuesSection />
      <BlogSection />
      <ClosingCTA />

      {/* Background gradient orbs */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Index;

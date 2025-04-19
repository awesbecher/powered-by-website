
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MessageCircle } from "lucide-react";
import AIAgentIllustration from "../AIAgentIllustration";

export const HeroSection = () => {
  const handleTryDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTalkToAgent = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Custom AI Agents for SMBs
            </h1>
            <p className="text-xl text-gray-300 max-w-xl">
              Empower your business with tailored AI solutions for voice, email, SMS, and workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                What's An AI Agent? <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={handleTryDemo}
                variant="outline" 
                className="border-2 border-[#8B5CF6] text-white hover:bg-[#8B5CF6]/20"
              >
                <Play className="mr-2 h-5 w-5" /> Try Demos
              </Button>
              <Button 
                onClick={handleTalkToAgent}
                variant="outline" 
                className="border-2 border-[#8B5CF6] text-white hover:bg-[#8B5CF6]/20"
              >
                <MessageCircle className="mr-2 h-5 w-5" /> Talk to An AI Agent
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <AIAgentIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

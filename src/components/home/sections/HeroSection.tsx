
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MessageCircle } from "lucide-react";

export const HeroSection = () => {
  const handleTryDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTalkToAgent = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Custom AI Agents for SMBs
            </h1>
            <p className="text-xl text-gray-300 max-w-xl">
              Launch AI agents that close deals, support customers, and scale operations — without writing code.
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
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 to-transparent rounded-3xl"></div>
              <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-[#8B5CF6]/30 via-purple-900/20 to-transparent p-8 backdrop-blur-sm border border-white/10">
                <div className="animate-pulse w-16 h-16 rounded-full bg-[#8B5CF6]/50 mx-auto mb-8"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-2 bg-white/10 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

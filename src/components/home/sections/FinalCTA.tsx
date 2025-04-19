
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MessageCircle } from "lucide-react";

export const FinalCTA = () => {
  const handleTryDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTalkToAgent = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Ready to Build Your AI Agent?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
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
    </section>
  );
};

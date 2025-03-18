
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { POWERED_BY_STYLE } from "@/components/voice-chat/hooks/types/contactFormTypes";

interface IntroSectionProps {
  initialLoad: boolean;
}

export const IntroSection = ({ initialLoad }: IntroSectionProps) => {
  return (
    <div className={`text-left transition-all duration-1000 delay-500 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      
      <div className="mb-6 flex justify-center lg:justify-start">
        <Link to="/voiceagent-form">
          <Button 
            variant="outline" 
            className="bg-white text-purple-700 hover:bg-gray-100 border-0 rounded-full px-6 py-2 font-semibold text-lg"
          >
            Launch Voice AI Agent Configurator <ArrowRight className="ml-1" />
          </Button>
        </Link>
      </div>
      
      <h2 className="relative text-4xl font-bold text-white mb-4 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">Setting up your AI voice agent.</h2>
      
      <div className="space-y-4 text-lg text-gray-300">
        <p className="text-left leading-relaxed"><span className={POWERED_BY_STYLE}>Powered_by</span> is excited to help you configure your free voice AI agent. This page will guide you through the setup process, giving you an overview of the 11-step process required to provide the appropriate workflow and objective design for your Voice AI Agent to meet your business needs.</p>
        
        <p className="text-left leading-relaxed">After reviewing these 11 steps and collecting the required information, click on <a href="https://poweredby.agency/voiceagent-form" className="font-bold hover:text-purple-400 transition-colors">"Launch Voice AI Agent Configurator"</a> to start the process. The agent configuration required no code and should take no longer than 20 minutes to complete. Once finished, we will provide further details on how to review and refine your first AI voice agent.</p>
      </div>
      
      <div className="mt-8 flex justify-center lg:justify-start">
        <Link to="/voiceagent-form">
          <Button 
            variant="outline" 
            className="bg-white text-purple-700 hover:bg-gray-100 border-0 rounded-full px-6 py-2 font-semibold text-lg"
          >
            Launch Voice AI Agent Configurator <ArrowRight className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

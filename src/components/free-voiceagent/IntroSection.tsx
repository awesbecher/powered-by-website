
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
      <h2 className="relative text-4xl font-bold text-white mb-4 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">Get your free AI voice agent today.</h2>
      
      <div className="space-y-4 text-lg text-gray-300">
        <p className="text-left leading-relaxed"><span className={POWERED_BY_STYLE}>Powered_by</span> now offers a free voice AI agent solution tailored specifically for your business needs. Whether you need a customer service assistant, a virtual sales rep, or a support specialist, our AI voice agents are designed to handle a wide range of business use cases with remarkable human-like conversation abilities.</p>
        
        <p className="text-left leading-relaxed">To get started, fill out the form and it will then prompt you with a series of questions and required information to start the configuration of your Voice AI Agent.</p>
        
        <p className="text-left leading-relaxed">Get started today with zero cost and see how voice AI can transform your business operations.</p>
      </div>
    </div>
  );
};

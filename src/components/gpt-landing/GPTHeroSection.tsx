
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

interface GPTHeroSectionProps {
  initialLoad: boolean;
}

export const GPTHeroSection: React.FC<GPTHeroSectionProps> = ({ initialLoad }) => {
  // GPT URL - this is where the CTA will link to
  const GPT_STORE_URL = "https://chat.openai.com/g/g-JUxczAFDl-powered-by-voice-agent-builder";
  const DIRECT_GPT_URL = "https://chatgpt.com/g/g-67f98710871881919806c28bcf3a6106-powered-by-voice-agent-builder";

  return (
    <div className="relative overflow-hidden px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className={`transition-all duration-1000 ease-out transform ${
          initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`}>
          <div className="mb-8">
            <PoweredByText className="mb-4 mx-auto" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="inline-flex items-center">
              <Bot className="mr-2 h-12 w-12 text-[#9b87f5]" />
              Build Your Own AI Voice Agent
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Your GPT-powered receptionist that can answer calls, schedule appointments, and handle FAQs.
            <span className="block font-semibold mt-2">All HIPAA-compliant and ready to deploy.</span>
          </p>
          
          <h2 className="text-2xl font-semibold text-white mb-4">💡 What Your AI Voice Agent Can Do</h2>
          <ul className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 list-none space-y-2">
            <li className="flex items-center">
              <span className="mr-2">✅</span> Handle inbound calls 24/7
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span> Schedule and confirm appointments
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span> Pre-screen patients by symptoms or urgency
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span> Answer common questions (hours, insurance, etc.)
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span> Escalate to staff for complex issues
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span> Fully HIPAA-compliant
            </li>
          </ul>
          
          <div className="flex justify-center space-x-4 mb-8">
            <a 
              href={DIRECT_GPT_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button 
                className="bg-[#0F172A] hover:bg-[#1A1F2C] text-white px-6 py-6 text-lg rounded-md"
                size="xl"
              >
                🚀 Try the GPT Now
              </Button>
            </a>

            <a 
              href={GPT_STORE_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-6 py-6 text-lg rounded-md"
                size="xl"
              >
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Abstract background shapes */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

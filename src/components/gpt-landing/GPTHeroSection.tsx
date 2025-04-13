
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
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Upload your configuration file or answer a few questions —
            your custom agent will be live in minutes.
          </p>
          
          <a 
            href={GPT_STORE_URL}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-6 text-lg rounded-md"
              size="xl"
            >
              👉 Try the AI Agent Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
      
      {/* Abstract background shapes */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

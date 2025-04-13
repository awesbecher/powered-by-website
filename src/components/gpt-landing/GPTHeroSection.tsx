
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  PhoneCall, 
  CalendarCheck, 
  ShieldCheck, 
  UserCheck, 
  MessageCircle, 
  Share2 
} from "lucide-react";

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
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Build Your Voice AI Agent <span className="text-[#9b87f5]">Today</span><br />
            <span className="text-[#9b87f5]">No Cost. No Commitment.</span>
          </h1>
          
          <div className="mt-4 flex flex-col space-y-1 text-2xl md:text-3xl text-white max-w-4xl mx-auto leading-relaxed font-bold">
            <p>Experience the power of conversational AI completely tailored to your business</p>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-6 mt-6">💡 What Your AI Voice Agent Can Do</h2>
          
          <div className="flex flex-wrap gap-6 justify-center mb-12">
            <div className="flex-1 min-w-[250px] bg-[#1A1F2C]/50 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-2">
                <PhoneCall className="h-8 w-8 text-[#9b87f5] mr-3" />
                <h3 className="font-semibold text-white text-lg">Handle Calls 24/7</h3>
              </div>
              <p className="text-gray-300 text-left">Never miss a lead or patient call again.</p>
            </div>
            
            <div className="flex-1 min-w-[250px] bg-[#1A1F2C]/50 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-2">
                <CalendarCheck className="h-8 w-8 text-[#9b87f5] mr-3" />
                <h3 className="font-semibold text-white text-lg">Automate Scheduling</h3>
              </div>
              <p className="text-gray-300 text-left">Book, reschedule, and confirm appointments automatically.</p>
            </div>
            
            <div className="flex-1 min-w-[250px] bg-[#1A1F2C]/50 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-2">
                <ShieldCheck className="h-8 w-8 text-[#9b87f5] mr-3" />
                <h3 className="font-semibold text-white text-lg">HIPAA Compliant</h3>
              </div>
              <p className="text-gray-300 text-left">Secure and private voice assistant, built for healthcare.</p>
            </div>
            
            <div className="flex-1 min-w-[250px] bg-[#1A1F2C]/50 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-2">
                <UserCheck className="h-8 w-8 text-[#9b87f5] mr-3" />
                <h3 className="font-semibold text-white text-lg">Patient Pre-screening</h3>
              </div>
              <p className="text-gray-300 text-left">Capture symptoms, urgency, and route accordingly.</p>
            </div>
            
            <div className="flex-1 min-w-[250px] bg-[#1A1F2C]/50 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-2">
                <MessageCircle className="h-8 w-8 text-[#9b87f5] mr-3" />
                <h3 className="font-semibold text-white text-lg">Answer FAQs</h3>
              </div>
              <p className="text-gray-300 text-left">Handle common questions like hours, location, insurance accepted, etc.</p>
            </div>
            
            <div className="flex-1 min-w-[250px] bg-[#1A1F2C]/50 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-2">
                <Share2 className="h-8 w-8 text-[#9b87f5] mr-3" />
                <h3 className="font-semibold text-white text-lg">Smart Escalation</h3>
              </div>
              <p className="text-gray-300 text-left">Forward urgent calls to real staff when needed.</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mb-8">
            <a 
              href={DIRECT_GPT_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button 
                className="bg-[#0F172A] hover:bg-[#1A1F2C] text-white px-6 py-6 text-lg rounded-md transition-all duration-200 ease-in-out hover:scale-105"
                size="xl"
              >
                🚀 Try the GPT Now
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};


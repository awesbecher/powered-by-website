import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  PhoneCall, 
  CalendarCheck, 
  ShieldCheck, 
  UserCheck, 
  MessageCircle, 
  Share2,
  Sparkles
} from "lucide-react";

interface GPTHeroSectionProps {
  initialLoad: boolean;
}

export const GPTHeroSection: React.FC<GPTHeroSectionProps> = ({ initialLoad }) => {
  // GPT URL - this is where the CTA will link to
  const GPT_STORE_URL = "https://chat.openai.com/g/g-JUxczAFDl-powered-by-voice-agent-builder";
  const DIRECT_GPT_URL = "https://chatgpt.com/g/g-67f98710871881919806c28bcf3a6106-powered-by-voice-agent-builder";

  return (
    <div className="relative overflow-hidden px-6 lg:px-8 py-16 md:py-24">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-[25rem] h-[25rem] bg-purple-600/20 rounded-full blur-[8rem]"></div>
        <div className="absolute bottom-20 right-[10%] w-[25rem] h-[25rem] bg-blue-600/20 rounded-full blur-[8rem]"></div>
      </div>
      
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <div className={`transition-all duration-1000 ease-out transform ${
          initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`}>
          {/* Top CTA Button with animated hover effect */}
          <div className="flex justify-center mb-12">
            <a 
              href={DIRECT_GPT_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block group"
            >
              <Button 
                className="bg-[#0F172A] hover:bg-[#1A1F2C] text-white px-6 py-6 text-lg rounded-md transition-all duration-300 hover:scale-105 border-2 border-white group-hover:shadow-lg group-hover:shadow-[#9b87f5]/30"
                size="xl"
              >
                Build Your Voice Agent Now 
                <ArrowRight className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
          
          {/* Hero headline with enhanced styling */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl mb-6 leading-tight whitespace-nowrap">
            Build Your Voice AI Agent <span className="text-[#9b87f5] relative inline-block">
              Today
              <span className="absolute -top-6 -right-6 text-[#9b87f5]/70">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </span>
            </span>
            <div className="mt-2 text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
              <span className="bg-gradient-to-r from-[#9b87f5] to-[#a87cff] bg-clip-text text-transparent">No Cost. No Commitment.</span>
            </div>
          </h1>
          
          {/* Subtitle with improved styling */}
          <div className="mt-6 mb-16">
            <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed font-semibold">
              Experience the power of conversational AI completely tailored to your business
            </p>
          </div>
          
          {/* New CTA Button placed above "Why Every Business Needs Voice AI" */}
          <div className="flex justify-center mb-8">
            <a 
              href={DIRECT_GPT_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block group"
            >
              <Button 
                className="bg-[#0F172A] hover:bg-[#1A1F2C] text-white px-6 py-6 text-lg rounded-md transition-all duration-300 hover:scale-105 border-2 border-white group-hover:shadow-lg group-hover:shadow-[#9b87f5]/30"
                size="xl"
              >
                Build Your Voice Agent Now 
                <ArrowRight className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
          
          {/* Enhanced "Why Every Business" section */}
          <div className="mt-12 mb-20 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#9b87f5]/50"></div>
              <h2 className="text-3xl font-bold text-white relative">
                Why Every Business Needs Voice AI
              </h2>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#9b87f5]/50"></div>
            </div>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Voice AI technology has revolutionized how businesses interact with customers, providing 24/7 availability and consistent service quality. Our free voice agent gives you a taste of this powerful technology without any financial commitment.
            </p>
          </div>
          
          {/* Enhanced "What Your AI Voice Agent Can Do" section */}
          <div className="mt-16">
            <div className="mb-10 flex items-center justify-center gap-4">
              <span className="text-[#9b87f5] text-2xl">💡</span>
              <h2 className="text-3xl font-bold text-white">What Your AI Voice Agent Can Do</h2>
            </div>
            
            {/* Card grid with enhanced styling */}
            <div className="flex flex-wrap gap-6 justify-center mb-16">
              <div className="flex-1 min-w-[250px] bg-gradient-to-br from-[#1A1F2C]/80 to-[#2A2F3C]/80 p-6 rounded-lg border border-white/5 shadow-lg hover:shadow-[#9b87f5]/10 hover:border-[#9b87f5]/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9b87f5]/10 p-3 rounded-full">
                    <PhoneCall className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <h3 className="font-semibold text-white text-lg ml-4">Handle Calls 24/7</h3>
                </div>
                <p className="text-gray-300 text-left">Never miss a lead or patient call again.</p>
              </div>
              
              <div className="flex-1 min-w-[250px] bg-gradient-to-br from-[#1A1F2C]/80 to-[#2A2F3C]/80 p-6 rounded-lg border border-white/5 shadow-lg hover:shadow-[#9b87f5]/10 hover:border-[#9b87f5]/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9b87f5]/10 p-3 rounded-full">
                    <CalendarCheck className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <h3 className="font-semibold text-white text-lg ml-4">Automate Scheduling</h3>
                </div>
                <p className="text-gray-300 text-left">Book, reschedule, and confirm appointments automatically.</p>
              </div>
              
              <div className="flex-1 min-w-[250px] bg-gradient-to-br from-[#1A1F2C]/80 to-[#2A2F3C]/80 p-6 rounded-lg border border-white/5 shadow-lg hover:shadow-[#9b87f5]/10 hover:border-[#9b87f5]/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9b87f5]/10 p-3 rounded-full">
                    <ShieldCheck className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <h3 className="font-semibold text-white text-lg ml-4">HIPAA Compliant</h3>
                </div>
                <p className="text-gray-300 text-left">Secure and private voice assistant, built for healthcare.</p>
              </div>
              
              <div className="flex-1 min-w-[250px] bg-gradient-to-br from-[#1A1F2C]/80 to-[#2A2F3C]/80 p-6 rounded-lg border border-white/5 shadow-lg hover:shadow-[#9b87f5]/10 hover:border-[#9b87f5]/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9b87f5]/10 p-3 rounded-full">
                    <UserCheck className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <h3 className="font-semibold text-white text-lg ml-4">Patient Pre-screening</h3>
                </div>
                <p className="text-gray-300 text-left">Capture symptoms, urgency, and route accordingly.</p>
              </div>
              
              <div className="flex-1 min-w-[250px] bg-gradient-to-br from-[#1A1F2C]/80 to-[#2A2F3C]/80 p-6 rounded-lg border border-white/5 shadow-lg hover:shadow-[#9b87f5]/10 hover:border-[#9b87f5]/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9b87f5]/10 p-3 rounded-full">
                    <MessageCircle className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <h3 className="font-semibold text-white text-lg ml-4">Answer FAQs</h3>
                </div>
                <p className="text-gray-300 text-left">Handle common questions like hours, location, insurance accepted, etc.</p>
              </div>
              
              <div className="flex-1 min-w-[250px] bg-gradient-to-br from-[#1A1F2C]/80 to-[#2A2F3C]/80 p-6 rounded-lg border border-white/5 shadow-lg hover:shadow-[#9b87f5]/10 hover:border-[#9b87f5]/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9b87f5]/10 p-3 rounded-full">
                    <Share2 className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <h3 className="font-semibold text-white text-lg ml-4">Smart Escalation</h3>
                </div>
                <p className="text-gray-300 text-left">Forward urgent calls to real staff when needed.</p>
              </div>
            </div>
            
            {/* Bottom CTA Button with enhanced styling */}
            <div className="flex justify-center mt-12">
              <a 
                href={DIRECT_GPT_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block group"
              >
                <Button 
                  className="bg-[#0F172A] hover:bg-[#1A1F2C] text-white px-8 py-6 text-lg rounded-md transition-all duration-300 hover:scale-105 border-2 border-white group-hover:shadow-lg group-hover:shadow-[#9b87f5]/30"
                  size="xl"
                >
                  Build Your Voice Agent Now 
                  <ArrowRight className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

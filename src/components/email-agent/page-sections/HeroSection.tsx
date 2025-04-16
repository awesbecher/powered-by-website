
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { HeroContent } from "./HeroContent";
import { Mail, CalendarClock, CheckCircle2 } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const { toast } = useToast();
  
  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        if (cal) {
          cal("ui", {
            "cssVarsPerTheme": {
              "light": {"cal-brand":"#292929"},
              "dark": {"cal-brand":"#fafafa"}
            },
            "hideEventTypeDetails": false,
            "layout": "month_view"
          });
        }
      } catch (error) {
        console.error("Error initializing Cal.com in HeroSection:", error);
      }
    })();
  }, []);

  return (
    <section className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl overflow-hidden">
      {/* Background gradients */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#9b87f5]/20 blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#9b87f5]/30 blur-3xl opacity-20 z-0" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left side - Hero content */}
        <div className="lg:col-span-7">
          <HeroContent initialLoad={initialLoad} handleContact={handleContact} />
          
          {/* Trust badges */}
          <div className={`mt-8 transition-all duration-1000 delay-500 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <p className="text-gray-400 text-sm mb-2 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1 text-[#9b87f5]" />
              Trusted by forward-thinking businesses
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="opacity-60 hover:opacity-100 transition-opacity">
                <img src="/lovable-uploads/481415ac-8aa5-41e0-8679-2701410d3c93.png" alt="Company logo" className="h-8 w-auto" />
              </div>
              <div className="h-6 w-px bg-gray-700"></div>
              <div className="text-gray-300 font-semibold">
                <span className="text-[#9b87f5]">99.8%</span> Email Response Accuracy
              </div>
              <div className="h-6 w-px bg-gray-700"></div>
              <div className="text-gray-300 font-semibold">
                <span className="text-[#9b87f5]">15+ hrs</span> Saved Weekly
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Email agent visualization */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <div className={`w-full transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            
            {/* Email Interface Mockup */}
            <div className="relative mx-auto max-w-md">
              {/* Email app frame */}
              <div className="bg-[#1e1e2d] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                {/* App header */}
                <div className="bg-[#252538] p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#9b87f5] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-medium">AI Email Assistant</h3>
                      <p className="text-gray-400 text-xs">Working for you 24/7</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    <div className="w-2 h-2 rounded-full bg-[#9b87f5]"></div>
                  </div>
                </div>
                
                {/* Email content */}
                <div className="p-4 space-y-3">
                  {/* Incoming email */}
                  <div className="bg-[#2a2a3c] p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white text-sm font-medium">John Davis</p>
                        <p className="text-gray-400 text-xs">customer@example.com</p>
                      </div>
                      <span className="text-gray-400 text-xs">10:42 AM</span>
                    </div>
                    <p className="text-gray-300 text-sm">Hello, I'm interested in your services but have some questions about pricing and availability. Can you help?</p>
                  </div>
                  
                  {/* AI Processing indicator */}
                  <div className="flex items-center justify-center py-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-[#9b87f5] text-xs">AI analyzing</span>
                      <span className="w-1.5 h-1.5 bg-[#9b87f5] rounded-full animate-pulse"></span>
                      <span className="w-1.5 h-1.5 bg-[#9b87f5] rounded-full animate-pulse delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-[#9b87f5] rounded-full animate-pulse delay-150"></span>
                    </div>
                  </div>
                  
                  {/* AI Reply */}
                  <div className="bg-[#2a2a3c] p-3 rounded-lg border border-[#9b87f5]/30">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-[#9b87f5] flex items-center justify-center mr-2">
                          <Mail className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">AI Assistant</p>
                          <p className="text-gray-400 text-xs">On your behalf</p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xs">10:43 AM</span>
                    </div>
                    <p className="text-gray-300 text-sm">Hi John, thanks for your interest! I'd be happy to provide our pricing details and check availability for you. Our basic package starts at $199/month with a 15% discount for annual billing. Would you like me to schedule a demo call with our team to discuss your specific needs?</p>
                    <div className="mt-2 pt-2 border-t border-gray-700 flex justify-between items-center">
                      <span className="text-[#9b87f5] text-xs">AI generated ∙ Approved automatically</span>
                      <div className="text-xs text-gray-400">Sent ✓</div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom stats */}
                <div className="bg-[#252538] p-3 flex justify-between items-center text-xs">
                  <div className="text-gray-400">Today's emails: <span className="text-[#9b87f5]">27 handled</span></div>
                  <div className="text-gray-400">Response time: <span className="text-[#9b87f5]">~45s</span></div>
                </div>
              </div>
              
              {/* "Powered by AI" badge */}
              <div className="absolute -right-4 -bottom-4 bg-[#9b87f5] px-3 py-1.5 rounded-lg shadow-xl">
                <p className="text-white text-xs font-semibold">Powered by AI</p>
              </div>
            </div>
            
            {/* CTA below email mockup */}
            <div className="mt-8 flex justify-center">
              <button 
                onClick={handleContact}
                className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white font-semibold py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <CalendarClock className="w-5 h-5" />
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

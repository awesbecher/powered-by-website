
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { HeroContent } from "./HeroContent";
import { MessageSquare, Phone, MessageCircle } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const { toast } = useToast();
  
  // Initialize Cal.com at the component level
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in TextAgent HeroSection");
        const cal = await getCalApi({"namespace":"get-started-with-ai-sms-text-agents"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully in TextAgent HeroSection");
      } catch (error) {
        console.error("Error initializing Cal.com embed in TextAgent HeroSection:", error);
      }
    })();
  }, []);

  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl overflow-hidden">
      {/* Background gradients */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#9b87f5]/20 blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#9b87f5]/30 blur-3xl opacity-20 z-0" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left side - Hero content */}
        <div className="lg:col-span-7">
          <HeroContent initialLoad={initialLoad} handleContact={handleContact} />
        </div>
        
        {/* Right side - Interactive illustration */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <div className={`flex flex-col items-center transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            
            {/* Phone mockup with text message animation */}
            <div className="relative mb-3">
              {/* Phone frame */}
              <div className="w-[280px] h-[560px] bg-black rounded-[36px] border-8 border-[#333] shadow-2xl flex flex-col overflow-hidden">
                {/* Phone status bar */}
                <div className="bg-[#222] py-2 px-4 flex justify-between items-center">
                  <div className="text-xs text-white">9:41</div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-5 w-24 h-5 bg-black rounded-full"></div>
                  <div className="text-xs text-white flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 10V14H14V10H18Z" fill="white" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.3 4.3C11.7 3.9 12.3 3.9 12.7 4.3L15.3 6.9L16.7 5.5C17.1 5.1 17.7 5.1 18.1 5.5C18.5 5.9 18.5 6.5 18.1 6.9L16.7 8.3L19.3 10.9C19.7 11.3 19.7 11.9 19.3 12.3C18.9 12.7 18.3 12.7 17.9 12.3L15.3 9.7L12.7 12.3C12.3 12.7 11.7 12.7 11.3 12.3C10.9 11.9 10.9 11.3 11.3 10.9L13.9 8.3L11.3 5.7C10.9 5.3 10.9 4.7 11.3 4.3Z" fill="white" />
                      <path d="M10 14H6V18H10V14Z" fill="white" />
                      <path d="M6 10H10V6H6V10Z" fill="white" />
                      <path d="M10 20H6V24H10V20Z" fill="white" />
                    </svg>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 7V17L16 12L10 7Z" fill="white" />
                    </svg>
                  </div>
                </div>
                
                {/* Phone content - messages */}
                <div className="bg-gradient-to-b from-[#1a0b2e] to-[#13151a] flex-grow p-4 overflow-y-auto">
                  {/* Contact header */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#6342ff] rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-3">
                      <div className="text-white font-bold">OutboundAI Agent</div>
                      <div className="text-xs text-gray-400">Online now</div>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="space-y-4">
                    {/* Incoming message */}
                    <div className="flex justify-start">
                      <div className="bg-[#333] rounded-xl rounded-tl-none p-3 max-w-[80%]">
                        <p className="text-white text-sm">Hi Jessica! This is Sarah from TechBoost. I noticed you downloaded our whitepaper on AI solutions. Would you be interested in a personalized demo?</p>
                        <p className="text-[10px] text-gray-400 text-right mt-1">9:32 AM</p>
                      </div>
                    </div>
                    
                    {/* Outgoing message */}
                    <div className="flex justify-end">
                      <div className="bg-[#6342ff] rounded-xl rounded-tr-none p-3 max-w-[80%]">
                        <p className="text-white text-sm">Thanks for reaching out! Yes, I would be interested but I have a few questions first.</p>
                        <p className="text-[10px] text-white/70 text-right mt-1">9:35 AM</p>
                      </div>
                    </div>
                    
                    {/* Incoming message */}
                    <div className="flex justify-start">
                      <div className="bg-[#333] rounded-xl rounded-tl-none p-3 max-w-[80%]">
                        <p className="text-white text-sm">Of course! I'd be happy to answer any questions you have. What would you like to know about our AI solutions?</p>
                        <p className="text-[10px] text-gray-400 text-right mt-1">9:36 AM</p>
                      </div>
                    </div>
                    
                    {/* Typing indicator */}
                    <div className="flex justify-start">
                      <div className="bg-[#333] rounded-xl rounded-tl-none p-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA button below phone */}
            <div className="mt-8">
              <button 
                onClick={() => {
                  console.log("See It In Action button clicked");
                  // Direct attempt to click the Cal button
                  const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents"]');
                  if (calBtn instanceof HTMLElement) {
                    calBtn.click();
                    console.log("Cal.com button clicked programmatically from HeroSection See It In Action");
                  } else {
                    console.error("Cal.com button not found in DOM from HeroSection See It In Action");
                    handleContact();
                  }
                }}
                className="bg-[#6342ff] hover:bg-[#7352ff] text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-5 h-5" />
                See It In Action
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden Cal.com button that will be triggered programmatically */}
      <button
        data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-sms-text-agents"
        data-cal-namespace="get-started-with-ai-sms-text-agents"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
      ></button>
    </section>
  );
};

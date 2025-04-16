
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, CalendarCheck } from "lucide-react";

interface CTASectionProps {
  handleContact: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ handleContact }) => {
  const handlePlayDemo = () => {
    // Scroll to the demo section or trigger the demo
    const demoTrigger = document.getElementById('voice-chat-trigger');
    if (demoTrigger) demoTrigger.click();
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0b2e] to-[#6342ff] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-[#161622] border border-gray-800 rounded-xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Experience the Power of AI Voice Chat
              </h2>
              <p className="text-gray-300 mb-6">
                Try our interactive demo to see how our AI voice agents can transform your customer interactions and boost your business.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 rounded-md flex items-center"
                  onClick={handlePlayDemo}
                >
                  <Play className="mr-2 h-5 w-5" /> Try Voice Demo
                </Button>
                <Button 
                  className="bg-transparent hover:bg-white/10 border-2 border-[#9b87f5] text-white px-6 py-5 rounded-md flex items-center"
                  onClick={handleContact}
                >
                  <CalendarCheck className="mr-2 h-5 w-5" /> Schedule a Demo
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-lg p-6 bg-[#232330] border border-gray-700 relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-[#9b87f5] flex items-center justify-center">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 8L16 12L10 16V8Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                <div className="pl-4">
                  <span className="text-gray-400 text-sm">Average Results</span>
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 text-sm">Conversion Rate</span>
                        <span className="text-[#9b87f5] font-bold">+32%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-[#9b87f5] h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 text-sm">Response Time</span>
                        <span className="text-[#9b87f5] font-bold">-74%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-[#9b87f5] h-2 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 text-sm">Customer Satisfaction</span>
                        <span className="text-[#9b87f5] font-bold">+28%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-[#9b87f5] h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

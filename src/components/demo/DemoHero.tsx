
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MessageSquare, Activity, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface DemoHeroProps {
  initialLoad: boolean;
}

export const DemoHero = ({ initialLoad }: DemoHeroProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  
  return (
    <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start justify-center"
          >
            <div className="bg-gradient-to-r from-[#6342ff]/20 to-[#9b87f5]/20 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#9b87f5] animate-pulse"></div>
              <span className="text-[#9b87f5] font-medium">AI Agent Demos</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight mb-6">
              Experience AI Agents <br />
              <span className="text-[#9b87f5]">In Action</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Witness the future of business communication with our multi-channel AI agents that transform how you engage with customers.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => document.getElementById('interactive-demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-6 py-6 text-lg rounded-xl"
              >
                Try the Demos <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                onClick={() => setVideoOpen(true)}
                variant="outline" 
                className="bg-transparent border border-gray-700 hover:bg-gray-900 text-white px-6 py-6 text-lg rounded-xl"
              >
                <Play className="mr-2 h-5 w-5" /> Watch Video
              </Button>
            </div>
          </motion.div>
          
          {/* AI Agent Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* AI Assistant Visualization */}
            <div className="relative">
              {/* Main circular background */}
              <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#6342ff]/30 to-[#9b87f5]/20 flex items-center justify-center relative">
                {/* Inner circle with glow */}
                <div className="w-[300px] h-[300px] rounded-full bg-[#1a0f2e] border border-[#6342ff]/30 flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(99,66,255,0.3)]">
                  {/* Center pulsing dot */}
                  <div className="absolute w-28 h-28 rounded-full bg-[#6342ff]/40 animate-pulse"></div>
                  
                  {/* Animated wave patterns */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 rounded-full border-4 border-[#9b87f5]/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#6342ff]/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                  </div>
                  
                  {/* AI Brain Icon */}
                  <div className="z-10">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#9b87f5]">
                      <path d="M12 4.5V18.75M12 4.5C13.1935 4.5 14.3381 4.97411 15.182 5.81802C16.0259 6.66193 16.5 7.80653 16.5 9M12 4.5C10.8065 4.5 9.66193 4.97411 8.81802 5.81802C7.97411 6.66193 7.5 7.80653 7.5 9M12 18.75C9.1005 18.75 6.75 16.1495 6.75 13.5V12.75C6.75 12.1533 6.71425 11.5665 6.64325 10.989M12 18.75C14.8995 18.75 17.25 16.1495 17.25 13.5V12.75C17.25 12.1533 17.2857 11.5665 17.3568 10.989M6.64325 10.989C5.20822 10.4784 4.1679 9.18036 4.02459 7.578C3.89243 6.12137 4.4399 4.73941 5.53264 3.86629C6.62537 2.99316 8.07123 2.70012 9.43204 3.07174C10.7929 3.44337 11.8884 4.43798 12.4235 5.7495M6.64325 10.989C6.20582 11.2927 5.62574 11.4877 5 11.4877C3.34315 11.4877 2 10.1446 2 8.48774C2 7.34433 2.67295 6.36459 3.64312 5.89466C4.76009 5.3335 6.06726 5.34231 7.17672 5.90536M17.3568 10.989C18.7918 10.4784 19.8321 9.18036 19.9754 7.578C20.1076 6.12137 19.5601 4.73941 18.4674 3.86629C17.3746 2.99316 15.9288 2.70012 14.568 3.07174C13.2071 3.44337 12.1116 4.43798 11.5765 5.7495M17.3568 10.989C17.7942 11.2927 18.3743 11.4877 19 11.4877C20.6569 11.4877 22 10.1446 22 8.48774C22 7.34433 21.327 6.36459 20.3569 5.89466C19.2399 5.3335 17.9327 5.34231 16.8233 5.90536" 
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '15s' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#6342ff] rounded-full p-3 shadow-lg shadow-purple-500/20">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                  <div className="absolute bottom-0 right-0 bg-[#9b87f5] rounded-full p-3 shadow-lg shadow-purple-500/20">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '25s' }}>
                  <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-[#a87cff] rounded-full p-3 shadow-lg shadow-purple-500/20">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-[#1a0f2e] border border-[#6342ff]/30 rounded-xl px-3 py-1.5 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <p className="text-[#9b87f5] text-sm font-medium">Voice AI</p>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-2 -left-4 bg-[#1a0f2e] border border-[#6342ff]/30 rounded-xl px-3 py-1.5 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <p className="text-[#a87cff] text-sm font-medium">Text & Chat</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/EGR10-TIQS8?si=yuQhOAFH9sqLNJRy&autoplay=1" 
              title="Launch Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

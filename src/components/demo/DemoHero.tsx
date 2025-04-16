
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
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
          
          {/* Removed AI Agent illustration section */}
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


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ClosingCTA = () => {
  return (
    <div className="relative mt-16 mb-8 max-w-7xl mx-auto px-4">
      <div className="relative z-10 glass-card p-12 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-400/10 backdrop-blur-sm" />
        
        <div className="relative z-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#ffffff40] opacity-30 blur" />
                <div className="relative bg-[#1a0b2e]/80 rounded-lg p-1">
                  <p className="text-xs uppercase tracking-wider text-[#9b87f5]">The Future of SMBs</p>
                </div>
              </div>
            </div>
            
            <p className="text-2xl md:text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Empower your business with intelligent AI agents that handle internal tasks and external customer interactions across all channels - 
              <span className="text-[#9b87f5]"> voice, email, SMS, chat, </span>
              and more.
            </p>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Streamline operations, reduce costs, and deliver exceptional service 24/7.
            </p>
            
            <Link to="/contact" className="inline-block mt-8">
              <Button className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105">
                Meet With Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#9b87f5]/20 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#9b87f5]/30 blur-2xl" />
      </div>
    </div>
  );
};

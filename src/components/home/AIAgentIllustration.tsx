
import { Brain, MessageSquare, Sparkles } from "lucide-react";

const AIAgentIllustration = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-[500px] flex items-center justify-center">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] opacity-50 rounded-3xl" />
      
      {/* Robot and laptop container */}
      <div className="relative">
        {/* Laptop */}
        <div className="w-64 h-48 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-xl transform perspective-1000 rotateX-10">
          {/* Robot head */}
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-gradient-to-br from-[#9b87f5] to-[#7a6cc5] rounded-2xl relative">
              {/* Robot eyes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-6 bg-black rounded-full overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center gap-4">
                    <div className="w-2 h-2 bg-[#61dafb] rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-[#61dafb] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-12 -left-24 transform -translate-y-full">
          <div className="bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 p-4 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg">
            <Brain className="w-6 h-6 text-[#9b87f5]" />
          </div>
          <div className="absolute w-2 h-2 bg-[#9b87f5] rounded-full top-1/2 -right-8" />
        </div>

        {/* AI Agent text bubble */}
        <div className="absolute -top-16 right-0 transform translate-x-1/2">
          <div className="bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg">
            <p className="text-white font-medium">AI AGENT</p>
          </div>
          <div className="absolute w-2 h-2 bg-[#9b87f5] rounded-full bottom-0 left-0" />
        </div>

        {/* Message bubble */}
        <div className="absolute -top-8 right-0 transform translate-x-full">
          <div className="bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 p-4 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg">
            <MessageSquare className="w-6 h-6 text-[#9b87f5]" />
          </div>
          <div className="absolute w-2 h-2 bg-[#9b87f5] rounded-full top-1/2 -left-8" />
        </div>

        {/* Sparkles bubble */}
        <div className="absolute top-0 right-0 transform translate-x-1/2">
          <div className="bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 p-4 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg">
            <Sparkles className="w-6 h-6 text-[#9b87f5]" />
          </div>
          <div className="absolute w-2 h-2 bg-[#9b87f5] rounded-full bottom-0 left-0" />
        </div>

        {/* Connecting lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
            <path
              d="M 200 100 Q 150 150 100 150 L 50 150"
              stroke="#9b87f5"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              className="animate-dash"
            />
            <path
              d="M 200 100 Q 250 150 300 150 L 350 150"
              stroke="#9b87f5"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              className="animate-dash"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AIAgentIllustration;

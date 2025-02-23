
import { MessageCircle, Phone, Smartphone, MessageSquare, Sparkles, Bot, Mail } from "lucide-react";

const AIAgentIllustration = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-[500px] flex items-center justify-center">
      {/* Robot and laptop container */}
      <div className="relative">
        {/* Laptop */}
        <div className="w-64 h-48 bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 rounded-lg backdrop-blur-sm border border-white/10 shadow-xl transform perspective-1000 rotateX-10 overflow-hidden">
          {/* Neural network visualization */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 256 192">
              {/* Background circuit patterns */}
              <path
                d="M 20 96 Q 50 20 128 96 T 236 96"
                stroke="#9b87f5"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
                className="animate-dash"
                opacity="0.3"
              />
              <path
                d="M 20 120 Q 128 40 236 120"
                stroke="#9b87f5"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
                className="animate-dash"
                opacity="0.3"
              />
              
              {/* Neural network nodes */}
              <circle cx="128" cy="96" r="4" fill="#9b87f5" opacity="0.5">
                <animate
                  attributeName="opacity"
                  values="0.5;0.8;0.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="64" cy="76" r="3" fill="#9b87f5" opacity="0.3" />
              <circle cx="192" cy="76" r="3" fill="#9b87f5" opacity="0.3" />
              <circle cx="96" cy="116" r="3" fill="#9b87f5" opacity="0.3" />
              <circle cx="160" cy="116" r="3" fill="#9b87f5" opacity="0.3" />
              
              {/* Bot icon in the middle */}
              <foreignObject x="108" y="76" width="40" height="40">
                <Bot className="w-10 h-10 text-[#9b87f5] animate-pulse" />
              </foreignObject>
              
              {/* Connecting lines with animation */}
              <path
                d="M 64 76 L 128 96 L 192 76"
                stroke="#9b87f5"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;100"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M 96 116 L 128 96 L 160 116"
                stroke="#9b87f5"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;100"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
              
              {/* Data flow particles */}
              <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
                <animateMotion
                  path="M 0 0 Q 30 -40 64 -20"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
                <animateMotion
                  path="M 0 0 Q -30 -40 -64 -20"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

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

        {/* Chat Agent text bubble */}
        <div className="absolute top-12 right-0 transform translate-x-3/4">
          <div className="bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#9b87f5]" />
            <p className="text-white font-medium">CHAT AGENT</p>
          </div>
          <div className="absolute w-2 h-2 bg-[#9b87f5] rounded-full top-0 left-0" />
        </div>

        {/* Voice Agent bubble */}
        <div className="absolute -top-8 left-0 transform -translate-x-full">
          <div className="bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#9b87f5]" />
            <p className="text-white font-medium">VOICE AGENT</p>
          </div>
          <div className="absolute w-2 h-2 bg-[#9b87f5] rounded-full bottom-0 right-0" />
        </div>

        {/* SMS Agent bubble */}
        <div className="absolute top-12 left-0 transform -translate-x-3/4">
          <div className="bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[#9b87f5]" />
            <p className="text-white font-medium">SMS AGENT</p>
          </div>
          <div className="absolute w-2 h-2 bg-[#9b87f5] rounded-full top-0 right-0" />
        </div>

        {/* Email Agent bubble */}
        <div className="absolute top-32 right-0 transform translate-x-1/2">
          <div className="bg-gradient-to-br from-[#9b87f5]/20 to-[#9b87f5]/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#9b87f5]" />
            <p className="text-white font-medium">EMAIL AGENT</p>
          </div>
          <div className="absolute w-2 h-2 bg-[#9b87f5] rounded-full top-0 left-0" />
        </div>

        {/* Connecting lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
            <path
              d="M 200 100 Q 250 150 300 150 L 350 150"
              stroke="#9b87f5"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              className="animate-dash"
            />
            <path
              d="M 50 150 L 150 150"
              stroke="#9b87f5"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              className="animate-dash"
            />
            <path
              d="M 75 200 L 175 150"
              stroke="#9b87f5"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              className="animate-dash"
            />
            <path
              d="M 200 200 Q 250 200 300 200"
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

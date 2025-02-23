
import { Bot } from "lucide-react";

const NeuralNetwork = () => {
  return (
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
        
        {/* Label text at the top of the box */}
        <text
          x="128"
          y="40"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontFamily="system-ui"
          fontWeight="bold"
          className="select-none"
        >
          Custom Agent Builder
        </text>

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
        
        {/* Original cyan data flow particles */}
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
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
          <animateMotion
            path="M 0 0 Q 40 20 64 20"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
          <animateMotion
            path="M 0 0 Q -40 20 -64 20"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
          <animateMotion
            path="M 0 0 Q 30 -30 32 -40"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
          <animateMotion
            path="M 0 0 Q -30 -30 -32 -40"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
          <animateMotion
            path="M 0 0 Q 20 30 30 35"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#61dafb">
          <animateMotion
            path="M 0 0 Q -20 30 -30 35"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* New purple data flow particles */}
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
          <animateMotion
            path="M 0 0 Q 35 -35 70 -15"
            dur="2.3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
          <animateMotion
            path="M 0 0 Q -35 -35 -70 -15"
            dur="2.3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
          <animateMotion
            path="M 0 0 Q 45 15 75 25"
            dur="1.7s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
          <animateMotion
            path="M 0 0 Q -45 15 -75 25"
            dur="1.7s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
          <animateMotion
            path="M 0 0 Q 25 -35 37 -45"
            dur="1.9s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
          <animateMotion
            path="M 0 0 Q -25 -35 -37 -45"
            dur="1.9s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
          <animateMotion
            path="M 0 0 Q 15 35 25 40"
            dur="2.1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="animate-pulse" cx="128" cy="96" r="1" fill="#9b87f5">
          <animateMotion
            path="M 0 0 Q -15 35 -25 40"
            dur="2.1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default NeuralNetwork;

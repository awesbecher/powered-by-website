
import { Bot } from "lucide-react";

const NetworkNodes = () => {
  return (
    <>
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
      
      <foreignObject x="108" y="76" width="40" height="40">
        <Bot className="w-10 h-10 text-[#9b87f5] animate-pulse" />
      </foreignObject>
      
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
    </>
  );
};

export default NetworkNodes;

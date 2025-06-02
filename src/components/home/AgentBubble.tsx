
import { LucideIcon } from "lucide-react";

interface AgentBubbleProps {
  title: string;
  icon: LucideIcon;
  position: string;
  dotPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  iconClassName?: string;
  bubbleClassName?: string;
}

const AgentBubble = ({ 
  title, 
  icon: Icon, 
  position, 
  dotPosition,
  iconClassName = "text-[#9b87f5]",
  bubbleClassName = "from-[#9b87f5]/20 to-[#9b87f5]/30 border-white/10"
}: AgentBubbleProps) => {
  const getDotPositionClasses = (pos: string) => {
    switch (pos) {
      case "top-left": return "top-0 left-0";
      case "top-right": return "top-0 right-0";
      case "bottom-left": return "bottom-0 left-0";
      case "bottom-right": return "bottom-0 right-0";
      default: return "top-0 left-0";
    }
  };

  return (
    <div className={`absolute ${position}`}>
      <div className={`bg-gradient-to-br ${bubbleClassName} px-4 py-2 rounded-lg backdrop-blur-sm border shadow-lg flex items-center gap-2`}>
        <Icon className={`w-5 h-5 ${iconClassName}`} />
        <p className="text-white font-medium">{title}</p>
      </div>
      <div className={`absolute w-2 h-2 bg-[#9b87f5] rounded-full ${getDotPositionClasses(dotPosition)}`} />
    </div>
  );
};

export default AgentBubble;

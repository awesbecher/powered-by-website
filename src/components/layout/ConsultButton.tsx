
import { Link } from "react-router-dom";
import { HeadsetIcon } from "lucide-react";

interface ConsultButtonProps {
  show: boolean;
}

const ConsultButton = ({ show }: ConsultButtonProps) => {
  if (!show) return null;
  
  const handleAIAgentClick = () => {
    console.log("Talk to AI Agent button clicked, dispatching event");
    // Dispatch the custom event to open the voice dialog
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };
  
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleAIAgentClick}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#6342ff] hover:bg-[#5331ee] transition-colors duration-200"
      >
        <HeadsetIcon className="w-4 h-4 mr-1.5" />
        Talk to an AI Agent
      </button>
      <Link
        to="/contact"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#9b87f5] hover:bg-[#8b77e5] transition-colors duration-200"
      >
        Get Started
      </Link>
    </div>
  );
};

export default ConsultButton;

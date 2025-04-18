
import { Link } from "react-router-dom";
import { HeadsetIcon } from "lucide-react";

interface ConsultButtonProps {
  show: boolean;
}

const ConsultButton = ({ show }: ConsultButtonProps) => {
  if (!show) return null;
  
  const handleAIAgentClick = () => {
    console.log("Talk to AI Agent button clicked, dispatching event");
    
    try {
      // Create and dispatch the event in a try-catch block to ensure it works
      const event = new CustomEvent('open-voice-dialog');
      document.dispatchEvent(event);
      console.log("open-voice-dialog event dispatched successfully");
    } catch (error) {
      console.error("Error dispatching open-voice-dialog event:", error);
    }
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
        to="/trynow"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#9b87f5] hover:bg-[#8b77e5] transition-colors duration-200"
      >
        Get Started
      </Link>
    </div>
  );
};

export default ConsultButton;

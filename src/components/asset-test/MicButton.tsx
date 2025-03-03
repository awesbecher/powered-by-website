
import React from "react";
import { Mic } from "lucide-react";

interface MicButtonProps {
  isCallActive: boolean;
  onClick: () => void;
}

const MicButton: React.FC<MicButtonProps> = ({ isCallActive, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
          isCallActive
            ? "bg-red-500 animate-pulse"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={onClick}
      >
        <Mic className={`w-12 h-12 ${isCallActive ? "text-white" : "text-black"}`} />
      </div>
      <p className="mt-6 text-center text-gray-300 max-w-xs">
        Click on the mic to try the AI voice agents after you choose the Agent Type on the left.
      </p>
    </div>
  );
};

export default MicButton;

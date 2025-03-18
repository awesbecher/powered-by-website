import { FileCog, Mic, Wrench, Settings } from "lucide-react";

interface SetupStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SetupStep = ({ number, title, description, icon }: SetupStepProps) => (
  <div className="relative flex gap-6 pb-12 group">
    {/* Left timeline with icon */}
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-purple-400 bg-[#2a1c42] text-purple-400 z-10">
        {icon}
      </div>
      {number < 4 && (
        <div className="w-0.5 h-full bg-purple-500/50 mt-3 -mb-12" />
      )}
    </div>
    
    {/* Content */}
    <div className="pt-1">
      <h3 className="text-2xl font-medium text-purple-400 mb-2">
        Step {number}: {title}
      </h3>
      <p className="text-gray-300 text-base leading-relaxed">{description}</p>
    </div>
  </div>
);

export const SetupSteps = () => {
  return (
    <div className="space-y-4 px-4 py-6 bg-[#1a0b2e]/90 rounded-xl">
      
    </div>
  );
};

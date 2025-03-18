
import { Phone, FileCog, Mic, Wrench, Settings } from "lucide-react";

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
      {number < 5 && (
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
      <SetupStep 
        number={1}
        title="Initial Consultation" 
        icon={<Phone className="w-6 h-6" />}
        description="Our team will contact you for an initial consultation to understand your business needs, customer interactions, and specific use cases for your voice AI agent."
      />
      
      <SetupStep 
        number={2}
        title="Knowledge Base Setup" 
        icon={<FileCog className="w-6 h-6" />}
        description="We'll work with you to compile essential information about your business, products, services, and frequently asked questions to form your AI's knowledge base."
      />
      
      <SetupStep 
        number={3}
        title="Voice & Personality Configuration" 
        icon={<Mic className="w-6 h-6" />}
        description="Select your preferred voice style and personality traits that align with your brand identity. We'll configure your AI to communicate in a way that represents your business appropriately."
      />
      
      <SetupStep 
        number={4}
        title="Testing & Refinement" 
        icon={<Wrench className="w-6 h-6" />}
        description="You'll have the opportunity to test your AI agent and provide feedback. We'll make necessary adjustments to improve performance and accuracy based on your input."
      />
      
      <SetupStep 
        number={5}
        title="Deployment & Training" 
        icon={<Settings className="w-6 h-6" />}
        description="Once everything is refined, we'll deploy your voice AI agent and provide training on how to monitor its performance and make basic adjustments as needed."
      />
    </div>
  );
};

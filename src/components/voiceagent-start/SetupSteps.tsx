
import { Check, Settings, FileCog, Phone, Mic, Wrench } from "lucide-react";

interface SetupStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SetupStep = ({ number, title, description, icon }: SetupStepProps) => (
  <div className="relative flex gap-6 pb-12 group">
    {/* Left timeline */}
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-purple-500 bg-[#2f1c4a] text-purple-400 z-10">
        {icon}
      </div>
      {number < 5 && (
        <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-purple-800 mt-3 -mb-12" />
      )}
    </div>
    
    {/* Content */}
    <div className="pt-1 -mt-1">
      <h3 className="text-2xl font-bold text-[#9b87f5] mb-2 flex items-center">
        <span className="mr-2">Step {number}:</span> {title}
      </h3>
      <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
    </div>
  </div>
);

export const SetupSteps = () => {
  return (
    <div className="mt-8 space-y-2">
      <h2 className="text-3xl font-bold text-white mb-8">Configuration Process</h2>
      
      <div className="space-y-4">
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
    </div>
  );
};

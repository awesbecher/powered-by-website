
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  return (
    <div className={`w-full lg:w-1/2 space-y-4 transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
        Meet Your New <span className="text-[#9b87f5]">AI Text Agent</span>: Texting reinvented!
      </h1>
      <p className="text-lg text-gray-300">
        Imagine an AI agent that sends and receives text messages for your business completely by itself. With the latest in AI agent intelligence, you can now deploy autonomous text agents that think, write, and behave exactly as your most well-trained staff.
      </p>
      <p className="text-lg text-gray-300">
        With an AI Text Agent by <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span>, you get intelligent SMS communication that handles follow-ups, inquiries, and customer interactions—all autonomously while meeting your company policies and privacy requirements.
      </p>
      <div className="space-y-3 text-gray-300">
        <p className="text-lg">Our AI Text Agent adapts to your business needs:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>Automates SMS marketing & lead gen campaigns</li>
          <li>Writes human-like texts using advanced NLP, ensuring every message feels on-brand</li>
          <li>Schedules, sends, and follows up on texts automatically based on triggers</li>
          <li>Stays TCPA and GDPR-friendly with opt-in/out handling and secure data management</li>
        </ul>
      </div>
      <div className="flex flex-col items-center mt-2">
        <div className="flex flex-wrap gap-3">
          <Button 
            className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-5 py-4 text-base rounded-md flex items-center"
            onClick={handleContact}
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

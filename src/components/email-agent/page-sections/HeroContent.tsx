
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
        Meet Your New <span className="text-[#9b87f5]">AI Email Agent</span>: Genius unleashed!
      </h1>
      <p className="text-lg text-gray-300">
        With an AI Email Agent by <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span>, you get intelligent email communication that handles follow-ups, inquiries, and customer interactions—all autonomously and compliant with company policies and privacy requirements.
      </p>
      <div className="space-y-3 text-gray-300">
        <p className="text-lg">Our AI Email Agent adapts to your business needs:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>Follow-up emails after customer calls with personalized summaries</li>
          <li>Intelligent responses to customer inquiries based on your business rules</li>
          <li>Appointment scheduling and confirmation emails</li>
          <li>Meeting coordination and document preparation</li>
          <li>Fully "guardrailed" and compliant to your policy guidelines & privacy standards</li>
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

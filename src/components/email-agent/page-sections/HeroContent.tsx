
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PoweredByText } from "@/components/shared/PoweredByText";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  return (
    <div className={`w-full space-y-4 transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
        Meet Your New <span className="text-[#9b87f5]">AI Email Agent</span>: Genius unleashed!
      </h1>
      <p className="text-lg text-gray-300">
        Imagine an AI agent that sends and receives emails for your business completely by itself. Sounds scary, right? Well, with the latest in AI agent intelligence, you can now deploy autonomous email agents that think, write, and behave exactly as your most well-trained staff.
      </p>
      <p className="text-lg text-gray-300">
        With an AI Email Agent by <PoweredByText />, you get intelligent email communication that handles follow-ups, inquiries, and customer interactions—all autonomously and compliant with company policies and privacy requirements.
      </p>
      <div className="space-y-3 text-gray-300">
        <p className="text-lg">Our AI Email Agent adapts to your business needs:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>Follow-up emails after customer calls with personalized summaries</li>
          <li>Appointment scheduling and confirmation emails</li>
          <li>Meeting coordination and document preparation</li>
          <li>Fully "guardrailed" and compliant to your policy guidelines & privacy standards</li>
        </ul>
      </div>
      {/* Get Started button and its container removed */}
    </div>
  );
};

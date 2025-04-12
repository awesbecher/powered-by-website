
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface IntroSectionProps {
  initialLoad: boolean;
}

export const IntroSection = ({ initialLoad }: IntroSectionProps) => {
  return (
    <div className={`text-left transition-all duration-1000 delay-300 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      
      <h2 className="text-3xl font-bold text-white mb-6">
        Why Every Business Needs <span className="text-[#9b87f5]">Voice AI</span>
      </h2>
      
      <div className="space-y-4 text-gray-300">
        <p>
          Voice AI technology has revolutionized how businesses interact with customers, providing 24/7 availability and consistent service quality. Our free voice agent gives you a taste of this powerful technology without any financial commitment.
        </p>
        
        <p>
          Perfect for small and medium-sized businesses looking to:
        </p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>Handle routine customer inquiries without hiring more staff</li>
          <li>Provide instant responses to common questions anytime</li>
          <li>Collect information from callers efficiently</li>
          <li>Create a modern, tech-forward impression for your business</li>
          <li>Free up your team to focus on more complex tasks</li>
        </ul>
        
        <p className="font-semibold text-white">
          Our free voice AI agent is not a scaled-down demo—it's a fully functional solution ready to help your business right away.
        </p>
        
        <div className="pt-4">
          <Link to="/voiceagent-start" className="group">
            <Button variant="default" className="bg-[#9b87f5] hover:bg-[#8a74e8] text-white">
              Configure Your Free Voice Agent <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

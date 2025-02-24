
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface IntroSectionProps {
  initialLoad: boolean;
}

export const IntroSection = ({ initialLoad }: IntroSectionProps) => {
  return (
    <div className={`text-left transition-all duration-1000 delay-500 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h2 className="relative text-5xl font-bold text-white mb-8 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent p-4 animate-gradient-x after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
        We're the world's first AI agency.
      </h2>
      
      <div className="space-y-8 text-lg text-gray-300">
        <p className="text-left leading-snug mb-8">We design and deploy intelligent agents tailored from the ground up to fit your unique needs—whether it's voice-driven phone assistants, email automation bots, text-based support, Slack integrations, or chatbots that speak and communicate as human-like as possible. Our mission? To automate the repetitive, amplify the human, and supercharge your workflows with AI that feels like it was made just for you—because it was.</p>
      </div>
    </div>
  );
};

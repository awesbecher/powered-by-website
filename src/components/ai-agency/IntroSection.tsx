
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
      <h2 className="text-5xl font-bold text-white mb-8 whitespace-nowrap bg-gradient-to-r from-purple-500/20 to-purple-400/20 inline-block px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-purple-400/30 transition-all">
        We're the world's first AI agency.
      </h2>
      
      <div className="space-y-8 text-lg text-gray-300 leading-relaxed text-justify">
        <p>We design and deploy intelligent agents tailored from the ground up to fit your unique needs—whether it's voice-driven phone assistants, email automation bots, text-based support, Slack integrations, or chatbots that speak and communicate as human-like as possible. Our mission? To automate the repetitive, amplify the human, and supercharge your workflows with AI that feels like it was made just for you—because it was.</p>

        <div className="flex justify-center mt-8 mb-16">
          <Link to="/blog/understanding-ai-agents">
            <Button 
              variant="outline" 
              className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400/10 hover:text-white transition-all"
            >
              What is an AI Agent?
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

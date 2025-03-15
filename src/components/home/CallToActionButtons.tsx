
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface CallToActionButtonsProps {
  handleNavigation: (path: string) => void;
  setShowDialog: (show: boolean) => void;
}

export const CallToActionButtons = ({ handleNavigation, setShowDialog }: CallToActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl">
      <Button
        onClick={() => window.open("https://poweredbyagency.ghost.io/ai-agents-a-laymans-guide/", "_blank")}
        className="relative z-20 text-white bg-[#6E59A5] hover:bg-[#6E59A5]/80 px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
      >
        What's an AI agent?
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Link to="/contact">
        <Button
          onClick={() => handleNavigation('/contact')}
          className="relative z-20 bg-accent hover:bg-accent-dark text-white px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
      <Button 
        onClick={() => setShowDialog(true)}
        className="relative z-20 bg-white hover:bg-gray-100 text-accent px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
      >
        Talk to an AI Agent Now
        <Phone className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

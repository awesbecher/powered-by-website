
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

interface CallToActionButtonsProps {
  handleNavigation: (path: string) => void;
  setShowDialog: (show: boolean) => void;
}

export const CallToActionButtons = ({ handleNavigation, setShowDialog }: CallToActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl">
      <Button
        onClick={() => handleNavigation('/blog/understanding-ai-agents')}
        className="relative z-20 text-white bg-[#6E59A5] hover:bg-[#6E59A5]/80 px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
      >
        What's an AI agent?
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Button
        onClick={() => handleNavigation('/contact')}
        className="relative z-20 bg-accent hover:bg-accent-dark text-white px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
      >
        Book a Free Consultation
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
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

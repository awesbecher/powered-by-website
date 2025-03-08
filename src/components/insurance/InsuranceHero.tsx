
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface InsuranceHeroProps {
  onShowConsentDialog: () => void;
  isLoading: boolean;
}

const InsuranceHero = ({ onShowConsentDialog, isLoading }: InsuranceHeroProps) => {
  return (
    <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
      <h1 className="text-5xl font-bold text-white mb-8 flex flex-col">
        <span>Welcome to Planter's.</span>
        <span className="text-accent">You're covered with us.</span>
      </h1>
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-xl text-gray-300">
            Our insurance specialists are ready to help you learn about our products and get your set up with a personalized quote. Click the button below to be connected to a Planter's Insurance team member.
          </p>
        </div>

        <div className="flex justify-center">
          <Button 
            className="w-64 h-[4.5rem] bg-accent hover:bg-accent/90 text-white text-lg px-6 flex flex-col items-center justify-center space-y-1"
            variant="default"
            onClick={onShowConsentDialog}
            disabled={isLoading}
          >
            <span className="leading-none">Speak to a Planter's</span>
            <span className="flex items-center leading-none">
              Insurance Agent Now
              <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceHero;

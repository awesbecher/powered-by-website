
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface InsuranceHeroProps {
  onShowConsentDialog: () => void;
  isLoading: boolean;
}

const InsuranceHero = ({ onShowConsentDialog, isLoading }: InsuranceHeroProps) => {
  return (
    <div className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-md rounded-lg p-8 border border-white/10 shadow-xl">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-gradient text-shadow">Welcome to Planter's.</span>
          <span className="block mt-2 text-accent">You're covered with us.</span>
        </h1>
        
        <div className="space-y-6">
          <p className="text-xl text-gray-200 leading-relaxed">
            Our insurance specialists are ready to help you learn about our products and get your set up with a personalized quote. Click the button below to be connected to a Planter's Insurance team member.
          </p>
          
          <div className="flex justify-start pt-4">
            <Button 
              className="w-64 h-[4.5rem] bg-accent hover:bg-accent/80 text-white text-lg px-6 flex flex-col items-center justify-center space-y-1 shadow-lg transition-all duration-300"
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
    </div>
  );
};

export default InsuranceHero;

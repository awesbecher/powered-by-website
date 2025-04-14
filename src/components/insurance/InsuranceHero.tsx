
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface InsuranceHeroProps {
  onShowConsentDialog: () => void;
  isLoading: boolean;
}

const InsuranceHero = ({ onShowConsentDialog, isLoading }: InsuranceHeroProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-white/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left content section */}
        <div className="lg:col-span-8 p-8 lg:p-12">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">Welcome to Planter's.</span>
            <span className="block mt-2 text-accent">You're covered with us.</span>
          </h1>
          
          <div className="space-y-6">
            <p className="text-xl text-gray-200 leading-relaxed">
              Our insurance specialists are ready to help you learn about our products and get your set up with a personalized quote. Click the button below to be connected to a Planter's Insurance team member.
            </p>
            
            <div className="flex justify-start pt-4">
              <Button 
                className="bg-accent hover:bg-accent/80 text-white text-lg px-8 py-6 flex items-center justify-center gap-2 shadow-lg transition-all duration-300 rounded-lg"
                variant="default"
                onClick={onShowConsentDialog}
                disabled={isLoading}
              >
                <span>Speak to a Planter's Insurance Agent Now</span>
                <Phone className="h-5 w-5 flex-shrink-0" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right decorative section - subtle pattern/gradient */}
        <div className="hidden lg:block lg:col-span-4 bg-gradient-to-br from-[#6342ff]/30 to-[#a87cff]/20">
          <div className="h-full w-full p-8 flex items-center justify-center">
            <div className="p-8 rounded-full bg-white/5 border border-white/10 shadow-inner">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center shadow-lg">
                <Phone className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceHero;

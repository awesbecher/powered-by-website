
import { Button } from "@/components/ui/button";
import { Phone, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface LicenseHeroProps {
  onShowCallDialog: () => void;
  onShowPricingDialog: () => void;
  isLoading: boolean;
}

const LicenseHero = ({ 
  onShowCallDialog, 
  onShowPricingDialog, 
  isLoading 
}: LicenseHeroProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-white/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left content section */}
        <div className="lg:col-span-8 p-8 lg:p-12">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">Transform Your Sales Outreach &</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              Customer Experience with AI Agents
            </span>
          </h1>
          
          <div className="space-y-6">
            <p className="text-xl text-gray-200 leading-relaxed">
              RightBloom delivers cutting-edge AI agent solutions that automate and enhance your sales and customer service operations, helping innovative companies scale their business efficiently.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 rounded-lg font-semibold transition-all flex items-center gap-2 text-lg"
                onClick={onShowPricingDialog}
                disabled={isLoading}
              >
                <span>View Products & Pricing</span>
                <DollarSign className="h-5 w-5" />
              </Button>
              
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-lg font-semibold transition-all flex items-center gap-2 text-lg"
                onClick={onShowCallDialog}
                disabled={isLoading}
              >
                <span>Speak to a Sales Rep</span>
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right decorative section */}
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

export default LicenseHero;

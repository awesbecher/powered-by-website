
import { Phone } from "lucide-react";
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SpringSalesEventProps {
  isProcessing: boolean;
  isCallActive: boolean;
  setShowOffers: (value: boolean) => void;
  setShowCallDialog: (value: boolean) => void;
}

const SpringSalesEvent = ({ 
  isProcessing, 
  isCallActive,
  setShowOffers,
  setShowCallDialog
}: SpringSalesEventProps) => {
  return (
    <div id="speak-with-us" className="rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm p-12 mb-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Spring Sales Event</h2>
        <p className="text-xl mb-6 text-white">Exceptional Offers on New 2025 Models</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-8 py-3 rounded-md font-semibold transition-colors"
            onClick={() => setShowOffers(true)}
          >
            View Special Offers
          </button>
          <button 
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-8 py-3 rounded-md font-semibold transition-colors flex items-center justify-center gap-2"
            onClick={() => setShowCallDialog(true)}
            disabled={isProcessing || isCallActive}
          >
            Speak with us now!
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpringSalesEvent;

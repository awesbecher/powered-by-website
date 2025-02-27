
import { Clock, Shield, Phone } from "lucide-react";
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VisitSectionProps {
  isProcessing: boolean;
  isCallActive: boolean;
  showCallDialog: boolean;
  setShowCallDialog: (value: boolean) => void;
}

const VisitSection = ({
  isProcessing,
  isCallActive,
  showCallDialog,
  setShowCallDialog
}: VisitSectionProps) => {
  return (
    <div className="bg-accent/10 rounded-lg p-8 text-center border border-accent/20">
      <h2 className="text-2xl font-bold mb-6 text-white">Visit Us Today</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <Clock className="w-6 h-6 mx-auto mb-2 text-[#9b87f5]" />
          <h3 className="font-bold mb-2 text-white">Hours</h3>
          <p className="text-white">Mon-Sat: 9AM - 7PM<br />Sunday: 10AM - 6PM</p>
        </div>
        <div>
          <Shield className="w-6 h-6 mx-auto mb-2 text-[#9b87f5]" />
          <h3 className="font-bold mb-2 text-white">Location</h3>
          <p className="text-white">1701 Alexander Ave E<br />Fife, WA 98424</p>
        </div>
        <div>
          <Phone className="w-6 h-6 mx-auto mb-2 text-[#9b87f5]" />
          <h3 className="font-bold mb-2 text-white">Contact</h3>
          <p className="text-white">Sales: (253) 200-1140</p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button 
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            onClick={() => setShowCallDialog(true)}
            disabled={isProcessing || isCallActive}
          >
            Schedule a Test Drive
          </button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default VisitSection;

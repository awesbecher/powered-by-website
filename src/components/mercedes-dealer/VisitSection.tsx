
import { Clock, Shield, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VisitSectionProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handleCall: () => void;
  isLoading: boolean;
  showCallDialog: boolean;
  setShowCallDialog: (value: boolean) => void;
}

const VisitSection = ({
  phoneNumber,
  setPhoneNumber,
  handleCall,
  isLoading,
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
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogTrigger asChild>
          <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors">
            Schedule a Test Drive
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#222222] text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Enter your phone number to schedule a test drive</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 pt-4">
            <Input 
              type="tel" 
              placeholder="Enter your phone number" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value)} 
              className="text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setShowCallDialog(false)}
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                onClick={handleCall}
                disabled={isLoading}
              >
                {isLoading ? "Initiating call..." : "Call Me"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisitSection;

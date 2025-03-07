import { Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ContactSectionProps {
  isScheduleOpen: boolean;
  setIsScheduleOpen: (value: boolean) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handleCall: () => void;
  isLoading: boolean;
}

export const ContactSection = ({
  isScheduleOpen,
  setIsScheduleOpen,
  phoneNumber,
  setPhoneNumber,
  handleCall,
  isLoading
}: ContactSectionProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
      <div className="bg-accent/10 rounded-lg p-8 text-center border border-accent/20">
        <h2 className="text-2xl font-bold mb-4 text-white">Ready to Find Your Dream Home?</h2>
        <p className="text-white mb-6 max-w-2xl mx-auto">
          Our experienced agents are here to help you navigate the Edison Township real estate market. Contact us today for a personalized consultation.
        </p>
        <div className="flex justify-center">
          <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Call us Now @ (732) 391-3572
          </button>
        </div>
        
        {/* Keep the dialog for functionality but don't display the trigger button */}
        <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
          <DialogContent className="bg-[#222222] text-white border-gray-800">
            <DialogHeader>
              <DialogTitle>Schedule a property viewing</DialogTitle>
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
                  onClick={() => setIsScheduleOpen(false)}
                  className="w-full border-gray-700 text-white hover:bg-gray-800 hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                  onClick={handleCall}
                  disabled={isLoading}
                >
                  {isLoading ? "Initiating call..." : "Schedule Now"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

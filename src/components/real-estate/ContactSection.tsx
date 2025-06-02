import { Phone } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ScheduleCallDialog } from "./ScheduleCallDialog";

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
          <DialogTrigger className="hidden">
            Schedule Viewing
          </DialogTrigger>
          <ScheduleCallDialog
            isOpen={isScheduleOpen}
            setIsOpen={setIsScheduleOpen}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handleCall={handleCall}
            isLoading={isLoading}
          />
        </Dialog>
      </div>
    </div>
  );
};


import { Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BookingDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  phoneNumber: string;
  handlePhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCall: () => Promise<void>;
  isLoading: boolean;
  formatPhoneNumber: (value: string) => string;
}

const BookingDialog = ({
  isOpen,
  setIsOpen,
  phoneNumber,
  handlePhoneNumberChange,
  handleCall,
  isLoading,
  formatPhoneNumber
}: BookingDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Book an Appointment
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#222222] text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Enter your phone number to speak with an agent</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 bg-gray-800 p-2 rounded border border-gray-700">
              +1
            </div>
            <Input 
              type="tel" 
              placeholder="(555) 123-4567"
              value={formatPhoneNumber(phoneNumber)}
              onChange={handlePhoneNumberChange}
              className="flex-1 text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setIsOpen(false)}
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
  );
};

export default BookingDialog;

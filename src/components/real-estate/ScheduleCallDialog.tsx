
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ScheduleCallDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handleCall: () => void;
  isLoading: boolean;
}

export const ScheduleCallDialog = ({
  isOpen,
  setIsOpen,
  phoneNumber,
  setPhoneNumber,
  handleCall,
  isLoading
}: ScheduleCallDialogProps) => {
  return (
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
            onClick={() => setIsOpen(false)}
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
  );
};


import { Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BookingDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleCall: () => Promise<void>;
  handleEndCall: () => Promise<void>;
  isLoading: boolean;
}

const BookingDialog = ({
  isOpen,
  setIsOpen,
  handleCall,
  handleEndCall,
  isLoading
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
          <DialogTitle>
            {isLoading ? "Your Chat with Flagship Barbers is in progress" : "Start Voice Chat with Alex Fisher on the Planter's Insurance Team"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          {!isLoading ? (
            <>
              <p className="text-gray-300">
                You'll be able to have a voice conversation with Alex directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
              </p>
              <p className="text-gray-300 text-sm">
                By clicking "Start Voice Chat", you consent to having a voice conversation with the Planter's Insurance team. You can end the conversation at any time.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="w-full border-gray-700 text-white hover:bg-gray-800 hover:text-white"
                >
                  End Call
                </Button>
                <Button 
                  className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                  onClick={handleCall}
                  disabled={isLoading}
                >
                  Start Voice Chat
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-300">
                Your voice chat is currently in progress. You can end the call at any time.
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={handleEndCall}
                  className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white font-bold"
                >
                  End Call
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;


import { Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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
        <DialogHeader className="flex items-start space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="/lovable-uploads/75237bd9-59bf-497d-89fc-9805c49cf84e.png"
              alt="Alex from Flagship Barbers"
              className="object-cover"
            />
          </Avatar>
          <div className="flex-1">
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              {isLoading ? "Voice Chat in Progress" : "Start Voice Chat with Alex @ Flagship Barbers"}
            </DialogTitle>
            <p className="text-gray-300">
              {isLoading 
                ? "You are currently in a voice conversation with our AI Agent. You can continue browsing the site while keeping this dialog open."
                : "You'll be able to have a voice conversation with Alex directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately."}
            </p>
          </div>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          {!isLoading && (
            <p className="text-gray-300 text-sm">
              By clicking "Start Voice Chat", you consent to having a voice conversation with Flagship Barbers. You can end the conversation at any time.
            </p>
          )}
          <div className="flex gap-2">
            {isLoading ? (
              <Button 
                onClick={handleEndCall}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                End Call
              </Button>
            ) : (
              <>
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
                  {isLoading ? "Starting..." : "Start Voice Chat"}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;

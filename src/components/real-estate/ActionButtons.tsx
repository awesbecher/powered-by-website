
import { Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { stopVapiCall } from "@/services/vapiService";

interface ActionButtonsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handleCall: () => void;
  isLoading: boolean;
  scrollToProperties: () => void;
}

export const ActionButtons = ({
  isOpen,
  setIsOpen,
  handleCall,
  isLoading,
  scrollToProperties
}: ActionButtonsProps) => {
  const navigate = useNavigate();

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      setIsOpen(false);
      // Redirect to demo page
      navigate('/demo');
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 -mt-12 sm:-mt-20 mb-8 sm:mb-16">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="w-full sm:w-auto bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-4 sm:px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="whitespace-nowrap">Speak with an Agent</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#222222] text-white border-gray-800 w-[95%] max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle>
                {isLoading ? "Your Chat with Planter's Insurance is in progress" : "Start Voice Chat with Our Insurance Team"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4 pt-4">
              {!isLoading ? (
                <>
                  <p className="text-gray-300 text-sm sm:text-base">
                    You'll be able to have a voice conversation with our Insurance Team directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    By clicking "Start Voice Chat", you consent to having a voice conversation with Planter's Insurance. You can end the conversation at any time.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
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
                      Start Voice Chat
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-300 text-sm sm:text-base">
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
        <button 
          onClick={scrollToProperties}
          className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-4 sm:px-6 py-3 rounded-md font-semibold transition-colors"
        >
          View Featured Listings
        </button>
      </div>
    </div>
  );
};

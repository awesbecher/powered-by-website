
import { Phone } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { stopVapiCall } from "@/services/vapiService";
import { VoiceChatDialog } from "./VoiceChatDialog";

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
            <Button 
              className="w-full sm:w-auto bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-4 sm:px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span className="whitespace-nowrap">Speak with an Agent</span>
            </Button>
          </DialogTrigger>
          <VoiceChatDialog 
            isLoading={isLoading}
            handleCall={handleCall}
            handleEndCall={handleEndCall}
            setIsOpen={setIsOpen}
          />
        </Dialog>
        <Button 
          variant="ghost"
          onClick={scrollToProperties}
          className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-4 sm:px-6 py-3 rounded-md font-semibold transition-colors"
        >
          View Featured Listings
        </Button>
      </div>
    </div>
  );
};

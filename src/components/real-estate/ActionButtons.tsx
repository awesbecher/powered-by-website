
import { Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 -mt-20 mb-16">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Speak with an Agent
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect with an AI Agent</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4 pt-4">
              <p className="text-gray-300">Click below to start speaking with our AI agent about properties you're interested in.</p>
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
                  {isLoading ? "Connecting..." : "Start Call"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <button 
          onClick={scrollToProperties}
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-semibold transition-colors"
        >
          View Featured Listings
        </button>
      </div>
    </div>
  );
};

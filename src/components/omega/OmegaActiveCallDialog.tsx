
import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Activity, X } from "lucide-react";
import { stopVapiCall } from "@/services/vapiService";
import { useToast } from "@/hooks/use-toast";

interface OmegaActiveCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEndCall: () => void;
}

const OmegaActiveCallDialog: React.FC<OmegaActiveCallDialogProps> = ({
  open,
  onOpenChange,
  onEndCall
}) => {
  const { toast } = useToast();

  // Add cleanup effect that ends the call when component unmounts
  useEffect(() => {
    return () => {
      if (open) {
        handleEndCall();
      }
    };
  }, [open]);

  const handleEndCall = () => {
    try {
      stopVapiCall();
      onEndCall();
    } catch (error) {
      console.error("Error ending call:", error);
      toast({
        variant: "destructive",
        title: "Error Ending Call",
        description: "There was a problem ending the call. Please try again."
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border-gray-800 sm:max-w-md p-6 rounded-xl" closeButton={false}>
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl font-bold text-white mb-2">You are now Connected</h2>
          
          <div className="flex items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <AspectRatio ratio={1/1} className="bg-gray-800">
                <img 
                  src="/lovable-uploads/730d1ffb-26f6-49bf-b7b9-ea7f9dba24d0.png" 
                  alt="Stella from Omega Pediatrics" 
                  className="object-cover w-full h-full rounded-full"
                />
              </AspectRatio>
              <div className="absolute bottom-1 left-1">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-3xl font-bold text-white">Stella</h3>
              <p className="text-gray-400">Omega Pediatrics</p>
            </div>
          </div>
          
          <div className="bg-[#1e2a3b] p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Call in progress</h3>
              <div className="flex items-center text-gray-300">
                <Activity className="w-5 h-5 mr-2" />
                <span>Live</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <p className="text-gray-400">Your microphone</p>
              </div>
              <div className="flex items-center">
                <div className="flex space-x-0.5 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-3 w-1 bg-white rounded-full ${i > 0 ? 'opacity-' + (100 - i * 20) : ''}`}
                    ></div>
                  ))}
                </div>
                <span className="text-gray-400">Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleEndCall}
              className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center space-x-2 transition-colors"
            >
              <X className="w-5 h-5 mr-2" />
              <span>End Call</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OmegaActiveCallDialog;

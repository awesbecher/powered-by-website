import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { X, Activity } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MercedesCallDialogProps {
  showCallDialog: boolean;
  setShowCallDialog: (show: boolean) => void;
  isCallActive: boolean;
  isProcessing: boolean;
  handleCall: () => Promise<void>;
  handleEndCall: () => void;
}

const MercedesCallDialog = ({
  showCallDialog,
  setShowCallDialog,
  isCallActive,
  isProcessing,
  handleCall,
  handleEndCall,
}: MercedesCallDialogProps) => {
  return (
    <Dialog open={showCallDialog || isCallActive} onOpenChange={(open) => {
      if (isCallActive && !open) {
        return;
      }
      setShowCallDialog(open);
    }}>
      <DialogContent className="bg-white text-black border-gray-200 sm:max-w-md p-6 rounded-xl">
        {isCallActive ? (
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">You are now Connected</h2>
              <button onClick={handleEndCall} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20 rounded-full border-2 border-white shadow-md">
                  <AvatarImage 
                    src="/lovable-uploads/1a963891-b5e5-4c4c-85fd-e5ec489343bd.png" 
                    alt="Dave Frankel" 
                    className="object-cover"
                  />
                  <AvatarFallback>DF</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 left-1 flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <div className="ml-1 flex space-x-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-3 w-1 rounded-full ${i === 0 ? 'bg-gray-800' : 'bg-gray-300'}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Dave Frankel</h3>
                <p className="text-gray-500">Mercedes of Tacoma</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Call in progress</h3>
                <div className="flex items-center text-gray-700">
                  <Activity className="w-5 h-5 mr-2" />
                  <span>Live</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-gray-600">Your microphone</p>
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-0.5 mr-2">
                    <div className="h-3 w-1 bg-black rounded-full"></div>
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-3 w-1 rounded-full ${i < 2 ? 'bg-gray-400' : 'bg-gray-300'}`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-gray-600">Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={handleEndCall}
                className="w-full py-3 px-4 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5 mr-2" />
                <span>End Call</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="flex flex-row items-start">
              <Avatar className="h-16 w-16 mr-4 border-2 border-[#9b87f5]">
                <AvatarImage 
                  src="/lovable-uploads/1a963891-b5e5-4c4c-85fd-e5ec489343bd.png" 
                  alt="Dave Frankel" 
                  className="object-cover"
                />
                <AvatarFallback>DF</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>
                  Start Voice Chat with Dave Frankel at Mercedes of Tacoma
                </DialogTitle>
              </div>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <p className="text-sm text-gray-600">
                You'll be able to have a voice conversation with our staff directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
              </p>
              <p className="text-sm text-gray-600">
                By clicking "Start Voice Chat", you consent to having a voice conversation with Mercedes of Tacoma. You can end the conversation at any time.
              </p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                onClick={() => setShowCallDialog(false)}
                disabled={isProcessing}
                className="border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                onClick={handleCall}
                disabled={isProcessing}
              >
                {isProcessing ? 'Connecting...' : 'Start Voice Chat'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MercedesCallDialog;

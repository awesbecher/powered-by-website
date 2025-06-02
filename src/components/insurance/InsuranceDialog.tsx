import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Activity, Mic, MicOff, X } from "lucide-react";

interface InsuranceDialogProps {
  showConsentDialog: boolean;
  setShowConsentDialog: (show: boolean) => void;
  isCallActive: boolean;
  isLoading: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  handleCall: () => Promise<void>;
  handleEndCall: () => void;
}

const InsuranceDialog = ({
  showConsentDialog,
  setShowConsentDialog,
  isCallActive,
  isLoading,
  isMuted,
  toggleMute,
  handleCall,
  handleEndCall
}: InsuranceDialogProps) => {
  return (
    <Dialog open={showConsentDialog} onOpenChange={setShowConsentDialog}>
      <DialogContent className="bg-[#222222] text-white border-gray-800">
        {isCallActive ? (
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">You are now Connected</h2>
              <button onClick={handleEndCall} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20 rounded-full border-2 border-white shadow-md">
                  <AvatarImage 
                    src="/assets/images/d346b971-ac00-4e01-b998-88ba7938a22f.png" 
                    alt="Chris Cambridge" 
                    className="object-cover"
                  />
                  <AvatarFallback>CC</AvatarFallback>
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
                <h3 className="text-2xl font-bold">Chris Cambridge</h3>
                <p className="text-gray-500">Planter's Insurance</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-700">Call in progress</h3>
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
            
            <div className="flex space-x-4">
              <button 
                onClick={toggleMute}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span>{isMuted ? "Unmute" : "Mute"}</span>
              </button>
              
              <button 
                onClick={handleEndCall}
                className="flex-1 py-3 px-4 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
                <span>End Call</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="flex flex-row items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage 
                  src="/assets/images/d346b971-ac00-4e01-b998-88ba7938a22f.png"
                  alt="Chris Cambridge"
                  className="object-cover"
                />
                <AvatarFallback>CC</AvatarFallback>
              </Avatar>
              <DialogTitle>Start Voice Chat with Chris Cambridge on the Planter's Insurance Team</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4 pt-4">
              <p className="text-gray-300">
                You'll be able to have a voice conversation with Chris Cambridge directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
              </p>
              <p className="text-gray-300 text-sm">
                By clicking "Start Voice Chat", you consent to having a voice conversation with the Planter's Insurance team. You can end the conversation at any time.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowConsentDialog(false)}
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                  onClick={handleCall}
                  disabled={isLoading}
                >
                  {isLoading ? "Initiating call..." : "Start Voice Chat"}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InsuranceDialog;

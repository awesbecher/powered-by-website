
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Activity, X } from "lucide-react";

interface ActiveCallDialogProps {
  isOpen: boolean;
  isMuted: boolean;
  handleEndCall: () => void;
  toggleMute: () => void;
}

export const ActiveCallDialog = ({ 
  isOpen, 
  isMuted, 
  handleEndCall, 
  toggleMute 
}: ActiveCallDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleEndCall()}>
      <DialogContent className="bg-white text-black border-gray-200 sm:max-w-md p-6 rounded-xl">
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
                <AvatarImage src="/lovable-uploads/2d9d7374-8cc7-4dee-944c-9614e9d40f77.png" alt="Jeff Smith" />
                <AvatarFallback>JS</AvatarFallback>
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
              <h3 className="text-2xl font-bold">Jeff Smith</h3>
              <p className="text-gray-500">Township Real Estate</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Call in progress</h3>
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
      </DialogContent>
    </Dialog>
  );
};

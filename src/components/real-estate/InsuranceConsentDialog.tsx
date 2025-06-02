
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface InsuranceConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const InsuranceConsentDialog = ({ 
  open, 
  onOpenChange, 
  onConfirm, 
  isLoading 
}: InsuranceConsentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black border-gray-200 sm:max-w-md">
        <DialogHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage 
              src="/assets/images/2d521c8d-084d-4a87-8491-cb795033a1d6.png"
              alt="Jeff Smith"
              className="object-cover"
            />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <DialogTitle className="text-xl font-bold">Start Voice Chat with Jeff Smith on the Township Real Estate team</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          <p className="text-gray-700">
            You'll be able to have a voice conversation with Jeff directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
          </p>
          <p className="text-gray-500 text-sm">
            By clicking "Start Voice Chat", you consent to having a voice conversation with Township Real Estate. You can end the conversation at any time.
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Initiating call..." : "Start Voice Chat"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InsuranceConsentDialog;


import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface InitialDialogProps {
  dialogContent: {
    title: string;
    description: string;
    buttonText: string;
    consent: string;
  };
  handleCloseDialog: () => void;
  handleStartCall: () => void;
  isSubmitting: boolean;
}

export const InitialDialog = ({
  dialogContent,
  handleCloseDialog,
  handleStartCall,
  isSubmitting
}: InitialDialogProps) => {
  return (
    <DialogContent className="bg-[#222222] text-white border-gray-800">
      <DialogHeader className="flex items-start space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src="/lovable-uploads/4bf8609b-100b-47bc-83ab-a1a376a57c4d.png"
            alt="Paul Berman, Chief Technical Evangelist @ Powered_by Agency"
            className="object-cover"
          />
          <AvatarFallback>PB</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <DialogTitle className="text-2xl font-bold text-white mb-2">
            {dialogContent.title}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {dialogContent.description}
          </DialogDescription>
        </div>
      </DialogHeader>
      <div className="flex flex-col space-y-4 pt-4">
        <p className="text-sm text-gray-300">
          {dialogContent.consent}
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => handleCloseDialog()}
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleStartCall}
            disabled={isSubmitting}
            className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
          >
            {isSubmitting ? "Starting..." : dialogContent.buttonText}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

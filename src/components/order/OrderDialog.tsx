
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Phone } from "lucide-react";
import { PhoneInput } from "./PhoneInput";
import { LoadingSpinner } from "./LoadingSpinner";

interface OrderDialogProps {
  isOpen: boolean;
  isCallInProgress: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
}

export const OrderDialog = ({
  isOpen,
  isCallInProgress,
  onOpenChange,
  onSubmit,
  phoneNumber,
  setPhoneNumber,
}: OrderDialogProps) => {
  return (
    <Dialog open={isOpen || isCallInProgress} onOpenChange={(open) => {
      if (!isCallInProgress) onOpenChange(open);
    }}>
      <DialogTrigger asChild>
        <button 
          className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md flex items-center gap-2"
          disabled={isCallInProgress}
        >
          {isCallInProgress ? 'Call in progress...' : 'Start your order'}
          <Phone className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCallInProgress ? 'Call in Progress' : 'Enter your phone number to place an order'}
          </DialogTitle>
          <DialogDescription>
            {isCallInProgress 
              ? 'You will receive a call shortly to take your order...'
              : 'Enter your phone number to begin your order.'}
          </DialogDescription>
        </DialogHeader>
        {!isCallInProgress ? (
          <PhoneInput 
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onSubmit={onSubmit}
          />
        ) : (
          <LoadingSpinner />
        )}
      </DialogContent>
    </Dialog>
  );
};

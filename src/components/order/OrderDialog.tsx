
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

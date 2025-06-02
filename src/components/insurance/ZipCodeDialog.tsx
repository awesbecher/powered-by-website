
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ZipCodeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (zipCode: string) => void;
  zipCode: string;
  setZipCode: (value: string) => void;
}

export const ZipCodeDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  zipCode,
  setZipCode,
}: ZipCodeDialogProps) => {
  const handleSubmit = () => {
    if (zipCode.length === 5) {
      onSubmit(zipCode);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Your Zip Code</DialogTitle>
          <DialogDescription>
            Please enter your zip code to check coverage availability in your area.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          <Input
            type="text"
            placeholder="Enter zip code"
            value={zipCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 5);
              setZipCode(value);
            }}
            className="text-lg"
            maxLength={5}
          />
          <button 
            onClick={handleSubmit}
            disabled={zipCode.length !== 5}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-md"
          >
            Continue
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

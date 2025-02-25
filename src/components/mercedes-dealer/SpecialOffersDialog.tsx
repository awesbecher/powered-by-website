
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SpecialOffersDialogProps {
  showOffers: boolean;
  setShowOffers: (value: boolean) => void;
}

const SpecialOffersDialog = ({ showOffers, setShowOffers }: SpecialOffersDialogProps) => {
  return (
    <Dialog open={showOffers} onOpenChange={setShowOffers}>
      <DialogContent className="bg-[#222222] text-white border-gray-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            March Special Offers
            <button
              onClick={() => setShowOffers(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogTitle>
          <DialogDescription className="text-white space-y-6 pt-4">
            <div className="space-y-4">
              <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-2 text-[#9b87f5]">Spring Bonus Special</h3>
                <p className="text-white">Get up to 15% off MSRP on any 2024 Mercedes model in our inventory.</p>
                <p className="mt-2 text-white">Plus, take advantage of our $2,000 down payment option on most 2024 models.</p>
              </div>
              
              <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-2 text-[#9b87f5]">March Leasing Offer</h3>
                <p className="text-white">Drive a new Mercedes with zero down payment!</p>
                <p className="mt-2 text-white">Enjoy 20% off your monthly lease payments for the first year.</p>
              </div>

              <div className="text-white mt-4">
                Offer valid March 1st through March 31st, 2024. Terms and conditions apply.
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialOffersDialog;


import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, X } from "lucide-react";

interface BookingDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleCall: () => void;
  handleEndCall: () => void;
  isLoading: boolean;
  title?: string;
  subtitle?: string;
}

const BookingDialog = ({ 
  isOpen, 
  setIsOpen, 
  handleCall, 
  handleEndCall, 
  isLoading,
  title = "Book an Appointment",
  subtitle = "We'll show you how Voice AI can help your team handle more calls — with less stress."
}: BookingDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md bg-white text-black p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{title}</DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {subtitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <Phone className="h-10 w-10 text-[#9b87f5] bg-[#9b87f5]/10 p-2 rounded-full" />
          </div>
          <h3 className="text-center font-bold text-lg mb-2">Experience Our AI Voice Assistant</h3>
          <p className="text-center text-gray-600 text-sm mb-4">
            Hear how our AI handles customer calls by clicking below.
          </p>
          <Button 
            onClick={handleCall} 
            className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white" 
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Start Voice Demo"}
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)} 
              className="border-gray-300"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;

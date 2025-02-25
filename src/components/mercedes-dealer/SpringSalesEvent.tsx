
import { Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SpringSalesEventProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handleCall: () => void;
  isLoading: boolean;
  setShowOffers: (value: boolean) => void;
}

const SpringSalesEvent = ({ 
  phoneNumber, 
  setPhoneNumber, 
  handleCall, 
  isLoading,
  setShowOffers 
}: SpringSalesEventProps) => {
  return (
    <div className="rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm p-12 mb-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Spring Sales Event</h2>
        <p className="text-xl mb-6 text-white">Exceptional Offers on New 2024 Models</p>
        <div className="space-y-4">
          <button 
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-8 py-3 rounded-md font-semibold transition-colors"
            onClick={() => setShowOffers(true)}
          >
            View Special Offers
          </button>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-8 py-3 rounded-md font-semibold transition-colors flex items-center justify-center gap-2 mx-auto">
                  Speak with us now!
                  <Phone className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#222222] text-white border-gray-800">
                <DialogHeader>
                  <DialogTitle>Enter your phone number to speak with a sales representative</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg text-white">+1</span>
                    <Input 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      value={phoneNumber} 
                      onChange={e => setPhoneNumber(e.target.value)} 
                      className="text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </DialogTrigger>
                    <Button 
                      className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                      onClick={handleCall}
                      disabled={isLoading}
                    >
                      {isLoading ? "Initiating call..." : "Call Me"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringSalesEvent;

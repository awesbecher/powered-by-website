
import { Link } from "react-router-dom";
import { Car, DollarSign, Wrench, Shield, Clock, Phone, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initiateVogentCall } from "@/services/vogentService";

const MercedesDealer = () => {
  const [showOffers, setShowOffers] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCall = async () => {
    if (!phoneNumber) {
      toast({
        variant: "destructive",
        title: "Please enter your phone number",
        description: "A phone number is required to connect with a sales representative."
      });
      return;
    }

    setIsLoading(true);
    try {
      await initiateVogentCall(phoneNumber);
      setShowCallDialog(false);
      setPhoneNumber("");
      toast({
        title: "Call initiated",
        description: "A sales representative will call you shortly."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error.message || "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="absolute top-24 right-8 z-10">
        <img 
          src="/lovable-uploads/7e5ffc92-3c33-4a4a-8d6d-add3197d2f2f.png"
          alt="Mercedes of Tacoma Logo"
          className="h-16 w-auto"
        />
      </div>

      <div className="relative h-[60vh] mb-4">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/a03fe01f-a020-43b3-a46c-2fda077f0baf.png"
            alt="Mercedes-Benz Dealership Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center px-4 lg:px-8">
          <Link to="/" className="absolute top-8 left-8 text-white hover:text-gray-200 transition-colors">
            ← Back
          </Link>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 text-white">
              Mercedes-Benz of Tacoma
            </h1>
            <p className="text-white max-w-2xl mx-auto text-lg leading-tight">
              Tacoma's Premier Authorized Mercedes-Benz Dealer. Experience luxury and performance with our extensive selection of new and certified pre-owned vehicles. View our special Spring pricing incentives below. Click to talk to a dealership team member now.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
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
                      <Input 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        value={phoneNumber} 
                        onChange={e => setPhoneNumber(e.target.value)} 
                        className="text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      />
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
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <Car className="w-6 h-6 mb-3 text-[#9b87f5]" />
            <h3 className="text-lg font-semibold mb-2 text-white">New Vehicles</h3>
            <p className="text-white text-sm">Explore our full lineup of new Mercedes-Benz vehicles.</p>
          </div>
          <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <DollarSign className="w-6 h-6 mb-3 text-[#9b87f5]" />
            <h3 className="text-lg font-semibold mb-2 text-white">Financing</h3>
            <p className="text-white text-sm">Competitive lease and finance options.</p>
          </div>
          <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <Wrench className="w-6 h-6 mb-3 text-[#9b87f5]" />
            <h3 className="text-lg font-semibold mb-2 text-white">Service Center</h3>
            <p className="text-white text-sm">Factory-trained technicians and parts.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <div className="bg-accent/10 rounded-lg p-8 text-center border border-accent/20">
          <h2 className="text-2xl font-bold mb-6 text-white">Visit Us Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <Clock className="w-6 h-6 mx-auto mb-2 text-[#9b87f5]" />
              <h3 className="font-bold mb-2 text-white">Hours</h3>
              <p className="text-white">Mon-Sat: 9AM - 7PM<br />Sunday: 10AM - 6PM</p>
            </div>
            <div>
              <Shield className="w-6 h-6 mx-auto mb-2 text-[#9b87f5]" />
              <h3 className="font-bold mb-2 text-white">Location</h3>
              <p className="text-white">1701 Alexander Ave E<br />Fife, WA 98424</p>
            </div>
            <div>
              <Phone className="w-6 h-6 mx-auto mb-2 text-[#9b87f5]" />
              <h3 className="font-bold mb-2 text-white">Contact</h3>
              <p className="text-white">Sales: (253) 200-1140</p>
            </div>
          </div>
          <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
            <DialogTrigger asChild>
              <button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors">
                Schedule a Test Drive
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#222222] text-white border-gray-800">
              <DialogHeader>
                <DialogTitle>Enter your phone number to schedule a test drive</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 pt-4">
                <Input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  value={phoneNumber} 
                  onChange={e => setPhoneNumber(e.target.value)} 
                  className="text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowCallDialog(false)}
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Cancel
                  </Button>
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
    </div>
  );
};

export default MercedesDealer;

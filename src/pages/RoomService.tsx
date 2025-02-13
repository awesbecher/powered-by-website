
import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RoomService = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneSubmit = () => {
    // Here you can handle the phone number submission
    console.log("Phone number submitted:", phoneNumber);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="absolute top-8 right-8">
        <a 
          href="https://madrone.capital/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src="/lovable-uploads/335f70ec-aa5b-4954-aa12-c425ddd41fc5.png" 
            alt="Madrone Capital Logo" 
            className="h-48 w-auto"
          />
        </a>
      </div>

      {/* Back button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          Room Service
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-xl text-gray-300 mb-8">
            Our virtual agent is ready to take your room service order. 
            Place your order anytime, day or night.
          </p>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="outline"
                className="w-full sm:w-auto"
              >
                Food Menu
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto"
              >
                Drinks Menu
              </Button>
            </div>
            <div>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto"
              >
                Start Your Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Number Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Phone Number</DialogTitle>
            <DialogDescription>
              Please enter your phone number to proceed with your order. An agent will call you now.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 bg-gray-100 p-2 rounded">
              <span className="text-sm text-gray-600">+1</span>
            </div>
            <Input
              type="tel"
              placeholder="(555) 555-5555"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handlePhoneSubmit}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomService;

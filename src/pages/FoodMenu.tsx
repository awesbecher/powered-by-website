
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

const FoodMenu = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneSubmit = () => {
    console.log("Phone number submitted:", phoneNumber);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Back button */}
      <Link 
        to="/room-service" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Room Service</span>
      </Link>

      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center items-center gap-12 mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Food Menu
          </h1>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Start your order
          </Button>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <img 
            src="/lovable-uploads/88643870-5f4f-40ea-91de-5c650a6f05b6.png" 
            alt="Restaurant Menu" 
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Phone Number Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Phone Number</DialogTitle>
            <DialogDescription>
              Please enter your phone number to proceed with your food order. An agent will call you now.
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

export default FoodMenu;

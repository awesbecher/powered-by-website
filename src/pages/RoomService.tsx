
import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const RoomService = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleCall = () => {
    if (!phoneNumber) {
      toast({
        variant: "destructive",
        title: "Please enter your phone number",
        description: "A phone number is required to place your order."
      });
      return;
    }

    toast({
      title: "Feature coming soon!",
      description: "This feature is currently under development."
    });
    setIsOpen(false);
    setPhoneNumber("");
  };

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute top-8 right-8">
        <img src="/lovable-uploads/f61255a3-5368-4739-a068-ec3431ea636f.png" alt="GrandView Hotel Logo" className="h-24 w-auto" />
      </div>

      <Link to="/" className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors">
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          Room Service
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-xl text-gray-300 mb-8">Our Room Service team is ready to take your room service order. Place your order anytime, day or night.</p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/food-menu">
                <button className="bg-neutral-800 text-white px-6 py-2 rounded-md hover:bg-neutral-700 transition-colors w-full sm:w-auto">
                  Food Menu
                </button>
              </Link>
              <Link to="/drinks-menu">
                <button className="bg-neutral-800 text-white px-6 py-2 rounded-md hover:bg-neutral-700 transition-colors w-full sm:w-auto">
                  Drinks Menu
                </button>
              </Link>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2">
                  Start Your Order
                  <Phone className="h-4 w-4" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter your phone number to place an order</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-4 pt-4">
                  <Input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    value={phoneNumber} 
                    onChange={e => setPhoneNumber(e.target.value)} 
                    className="text-lg"
                  />
                  <button 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-md"
                    onClick={handleCall}
                  >
                    Call Me
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomService;

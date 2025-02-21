
import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { LicenseProductCard } from "@/components/insurance/LicenseProductCard";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { initiateVogentCall } from "@/services/vogentService";

const License = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
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
    <div className="min-h-screen w-full bg-[#222222] px-4 py-32 sm:px-6 lg:px-8">
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <img 
        src="/lovable-uploads/e9ddfbf3-072d-410d-b7ed-01c83eb30564.png"
        alt="SaaS License"
        className="absolute top-8 right-8 h-12"
      />

      <div className="mx-auto max-w-3xl text-center">
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-5xl font-bold text-white mb-8">SaaS License Management</h1>
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-gray-300">
                Manage and upgrade your seat licenses with ease.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <LicenseProductCard />
              </div>
            </div>

            <div className="pt-4">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 text-white"
                    variant="default"
                  >
                    Speak to Sales Rep
                    <Phone className="h-4 w-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enter your phone number to speak with a sales representative</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4 pt-4">
                    <Input 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      value={phoneNumber} 
                      onChange={e => setPhoneNumber(e.target.value)} 
                      className="text-lg"
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="w-full"
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
  );
};

export default License;

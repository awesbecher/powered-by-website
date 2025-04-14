import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall } from "@/services/vapiService";
import { HeadsetIcon } from "lucide-react";
import MercedesDealerHeader from "./MercedesDealerHeader";

const HeroSection = () => {
  const { toast } = useToast();

  const handleVoiceCall = async () => {
    try {
      await initiateVapiCall("6c02f892-3082-4c68-a3ee-92ca86444331");
      toast({
        title: "Call initiated",
        description: "You are now connected to Dave Frankel from Mercedes of Tacoma."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to initiate call",
        description: error instanceof Error ? error.message : "Please try again later."
      });
    }
  };

  return (
    <div className="relative h-[75vh] mb-4">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/a03fe01f-a020-43b3-a46c-2fda077f0baf.png"
          alt="Mercedes-Benz Dealership Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="absolute top-6 left-0 right-0 mx-auto z-10 flex justify-center">
        <MercedesDealerHeader />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center px-4 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mt-32">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Mercedes-Benz of Tacoma
          </h1>
          <p className="text-white max-w-2xl mx-auto text-lg leading-tight mb-6">
            Tacoma's Premier Authorized Mercedes-Benz Dealer. Experience luxury and performance with our extensive selection of new and certified pre-owned vehicles. View our special Spring pricing incentives below. Click to talk to a dealership team member now.
          </p>
          <Button 
            onClick={handleVoiceCall}
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
          >
            <HeadsetIcon className="mr-2 h-4 w-4" />
            Speak with us now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

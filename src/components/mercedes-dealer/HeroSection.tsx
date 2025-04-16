
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import MercedesDealerHeader from "./MercedesDealerHeader";

interface HeroSectionProps {
  onSpeakWithUs?: () => void;
}

const HeroSection = ({ onSpeakWithUs }: HeroSectionProps = {}) => {
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
            onClick={() => window.location.href = "#speak-with-us"}
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
          >
            <Phone className="mr-2 h-4 w-4" />
            Speak with us now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

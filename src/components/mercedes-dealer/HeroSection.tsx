
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import MercedesDealerHeader from "./MercedesDealerHeader";

interface HeroSectionProps {
  onSpeakWithUs?: () => void;
  setShowCallDialog: (value: boolean) => void;
  isProcessing?: boolean;
  isCallActive?: boolean;
}

const HeroSection = ({
  onSpeakWithUs,
  setShowCallDialog,
  isProcessing = false,
  isCallActive = false
}: HeroSectionProps) => {
  return (
    <div className="relative h-[75vh] mb-4 pt-20">
      <div className="absolute inset-0">
        <img 
          src="/assets/images/a03fe01f-a020-43b3-a46c-2fda077f0baf.png"
          alt="Mercedes-Benz Dealership Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <MercedesDealerHeader />
      
      <div className="relative h-full flex flex-col items-center justify-center px-4 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mt-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
            <strong>Turn your dealership phone line into a sales machine — powered by AI.</strong> <br />
            <span className="text-[#9b87f5]">Available 24/7. Never miss a call again.</span>
          </h1>
          <p className="text-white max-w-2xl mx-auto text-lg leading-tight mb-6">
            Book more test drives. Answer every customer. Automatically.
          </p>
          <Button 
            size="xl"
            onClick={() => setShowCallDialog(true)}
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
            disabled={isProcessing || isCallActive}
          >
            <Phone className="mr-2 h-6 w-6" />
            Speak with us now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

interface ServiceBoxesProps {
  initialLoad: boolean;
  onTryNow?: () => void;
}

export const ServiceBoxes = ({ initialLoad, onTryNow }: ServiceBoxesProps) => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/contact");
  };

  return (
    <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform flex flex-col items-start justify-start
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="p-4 flex flex-col items-start space-y-6">
          <Button 
            onClick={onTryNow} 
            className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-6 text-lg rounded-md flex items-center"
          >
            <Mic className="mr-2 h-5 w-5" /> Try Voice AI Now
          </Button>
          
          <Button 
            onClick={handleGetStarted} 
            className="bg-white text-[#6342ff] hover:bg-gray-100 px-6 py-6 text-lg rounded-md"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}

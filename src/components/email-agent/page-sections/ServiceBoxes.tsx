
import { Mail, Headset } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

interface ServiceBoxesProps {
  initialLoad: boolean;
}

export const ServiceBoxes = ({ initialLoad }: ServiceBoxesProps) => {
  return (
    <div className={`w-full max-w-2xl transition-all duration-1000 delay-300 ease-out transform 
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="w-full text-center border border-gray-700/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg bg-black/40">
        <div className="max-w-lg mx-auto">
          <h4 className="text-white text-2xl font-bold mb-6">Don't believe us? Try it yourself:</h4>
          
          {/* Replace Nick's Image with Spiral Logo + Headset Icon */}
          <div className="mb-6 flex justify-center relative">
            <img 
              src="/lovable-uploads/fadf21f3-43ca-4db8-aa89-a422bb086eda.png" 
              alt="Purple spiral logo" 
              className="w-32 h-32 object-contain"
            />
            
            {/* Headset icon with adjusted positioning */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-[66%] -translate-y-[75%] flex items-center justify-center">
              <div className="bg-[#8B5CF6] rounded-full flex items-center justify-center" style={{ width: '36px', height: '36px' }}>
                <Headset className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          
          <p className="text-xl text-white font-medium mb-6">Email Nick! He's our favorite AI agent here at <PoweredByText />:</p>
          
          <div className="flex items-center justify-center mb-6">
            <Mail className="text-[#9b87f5] w-10 h-10 mr-3" />
            <a 
              href="mailto:nick@poweredby.agency" 
              className="inline-block text-xl font-bold text-[#9b87f5] hover:text-[#8a75e3] transition-colors underline underline-offset-4"
            >
              nick@poweredby.agency
            </a>
          </div>
          
          <p className="mt-6 text-gray-300 text-sm">
            Nick will respond automatically with the intelligence of a well-trained employee, showcasing 
            exactly what our AI email agents can do for your business.
          </p>
        </div>
      </div>
    </div>
  );
};

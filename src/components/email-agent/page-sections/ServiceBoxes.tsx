
import { Mail } from "lucide-react";
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
          <h4 className="text-white text-2xl font-bold mb-8">Don't believe us? Try it yourself:</h4>
          
          {/* Nick's Image */}
          <div className="mb-4 flex justify-center">
            <img 
              src="/lovable-uploads/aacd8d9f-424d-4420-be70-8362bbbea179.png" 
              alt="Nick - AI Email Agent" 
              className="w-24 h-24 rounded-full object-cover border-2 border-[#9b87f5]"
            />
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

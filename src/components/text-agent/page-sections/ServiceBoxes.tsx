
import { MessageCircle } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

interface ServiceBoxesProps {
  initialLoad: boolean;
}

export const ServiceBoxes = ({ initialLoad }: ServiceBoxesProps) => {
  return (
    <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform flex flex-col items-start justify-start
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="w-full text-center border border-gray-700/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg bg-black/40 mt-12">
        <div className="max-w-lg mx-auto">
          <h4 className="text-white text-2xl font-bold mb-8">Don't believe us? Try it yourself:</h4>
          
          {/* Sarah's Image */}
          <div className="mb-4 flex justify-center">
            <img 
              src="/assets/images/9a61c267-112f-464b-9479-2be87bbe7d9b.png" 
              alt="Sarah - AI Text Agent" 
              className="w-24 h-24 rounded-full object-cover border-2 border-[#9b87f5]"
            />
          </div>
          
          <p className="text-xl text-white font-medium mb-6">Text Sarah. She's our SMS-text AI agent here at <PoweredByText />:</p>
          
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="text-[#9b87f5] w-10 h-10 mr-3" />
            <a 
              href="sms:+14083849098" 
              className="inline-block text-xl font-bold text-[#9b87f5] hover:text-[#8a75e3] transition-colors underline underline-offset-4"
            >
              (408) 384-9098
            </a>
          </div>
          
          <p className="mt-6 text-gray-300 text-sm">
            Sarah will respond automatically with the intelligence of a well-trained employee, showcasing 
            exactly what our AI text agents can do for your business.
          </p>
        </div>
      </div>
    </div>
  );
};

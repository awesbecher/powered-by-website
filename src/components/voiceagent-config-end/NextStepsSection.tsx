
import { ArrowRight, CheckCircle, Clock, Mail } from "lucide-react";
import { POWERED_BY_STYLE } from "@/components/voice-chat/hooks/types/contactFormTypes";

interface NextStepsSectionProps {
  initialLoad: boolean;
}

export const NextStepsSection = ({ initialLoad }: NextStepsSectionProps) => {
  return (
    <div className={`text-left transition-all duration-1000 delay-500 ease-out transform
        ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      
      <h2 className="relative text-3xl font-bold text-white mb-6 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">
        What Happens Next?
      </h2>
      
      <div className="space-y-8 text-sm text-gray-300 max-w-3xl">
        <div className="bg-black/30 p-6 rounded-xl border border-purple-800/30">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Form Submission Complete</h3>
              <p className="text-gray-300">
                You've successfully submitted your voice AI agent configuration request. Our team at <span className={POWERED_BY_STYLE}>Powered_by</span> has received your information.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-black/30 p-6 rounded-xl border border-purple-800/30">
          <div className="flex items-start">
            <Clock className="h-6 w-6 text-amber-500 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Processing Your Request</h3>
              <p className="text-gray-300">
                Our team is now reviewing your submission and preparing your custom voice AI agent. This process typically takes 1-2 business days as we carefully configure your agent to match your specific requirements.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-black/30 p-6 rounded-xl border border-purple-800/30">
          <div className="flex items-start">
            <Mail className="h-6 w-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Expect Communication</h3>
              <p className="text-gray-300">
                You'll receive an email from our team with instructions on how to access and test your voice AI agent. This email will include all necessary credentials and steps to get started with your new AI solution.
              </p>
            </div>
          </div>
        </div>
        
        <p className="pt-4">
          If you have any questions in the meantime, please don't hesitate to reach out to our team at <a href="mailto:team@poweredby.agency" className="text-purple-400 hover:text-purple-300 transition-colors">team@poweredby.agency</a>.
        </p>
      </div>
    </div>
  );
};

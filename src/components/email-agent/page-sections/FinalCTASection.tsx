
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

interface FinalCTASectionProps {
  handleContact: () => void;
}

export const FinalCTASection = ({ handleContact }: FinalCTASectionProps) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        Ready to transform your SMB with AI agents?
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Join the businesses revolutionizing the way they work, communicate, & engage customers.
      </p>
      <Button 
        data-cal-namespace="get-started-with-ai-email-agents"
        data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-email-agents"
        data-cal-config='{"layout":"month_view"}'
        className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-8 py-6 text-lg rounded-md mx-auto flex items-center"
      >
        Get Started <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </section>
  );
};

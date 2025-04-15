
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
        Stop spending hours on email management.
        <br />
        Start impressing customers with <span className="italic text-[#9b87f5]">intelligent</span> communications.
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Boost efficiency, improve follow-up rates, and enhance customer satisfaction—all with the power of a <PoweredByText /> AI Email Agent.
      </p>
      <Button 
        data-cal-namespace="get-started-with-voice-ai-chat"
        data-cal-link="team-powered-by-dfbtbb/get-started-with-voice-ai-chat"
        data-cal-config='{"layout":"month_view"}'
        className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-8 py-6 text-lg rounded-md mx-auto flex items-center"
      >
        Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </section>
  );
};

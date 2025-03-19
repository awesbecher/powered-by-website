
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FinalCTASectionProps {
  handleContact: () => void;
}

export const FinalCTASection = ({ handleContact }: FinalCTASectionProps) => {
  // Remove handleContact from onClick to prevent the toast notification
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        Stop missing calls. Stop putting customers on hold.
        <br />
        Start impressing them from <span className="italic text-[#9b87f5]">Hello</span>.
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Boost efficiency, reduce wait times, and enhance customer satisfaction—all with the power of a <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> AI Receptionist.
      </p>
      <Link to="/contact">
        <Button 
          className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-8 py-6 text-lg rounded-md mx-auto"
        >
          Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </section>
  );
};


import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  return (
    <div className={`w-full lg:w-1/2 space-y-4 transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
        Meet Your New <span className="text-[#9b87f5]">AI Receptionist</span>
      </h1>
      <p className="text-lg text-gray-300">
        With an AI Receptionist by <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span>, you get the same personable experience customers expect from a traditional receptionist—only now it never sleeps, forgets, or drops a call. Sign up now to start building your own AI Receptionist.
      </p>
      <div className="space-y-3 text-gray-300">
        <p className="text-lg">Our AI Receptionist adapts to your business needs:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>Restaurant: Automate reservations and answer menu questions</li>
          <li>Auto Dealership: Pre-screen leads for test drives</li>
          <li>Retail: Answer product questions and handle order inquiries</li>
          <li>Small Business: Capture every lead, 24/7/365</li>
        </ul>
      </div>
    </div>
  );
};

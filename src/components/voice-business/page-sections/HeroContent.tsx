
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
        
        <div className="mt-6 p-4 bg-[#2a1a4a] rounded-lg border border-[#9b87f5]/30">
          <h3 className="text-xl font-semibold text-white mb-2">Talk to an AI Receptionist Now!</h3>
          <p className="text-gray-300 mb-3">Call any one of the businesses below.</p>
          <p className="text-gray-300 text-sm italic mb-4">(Don't worry, they're not real businesses)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#3a2a5a] p-3 rounded-md">
              <p className="font-medium text-white">Auto Dealership</p>
              <p className="text-gray-300">Mercedes of Tacoma</p>
              <p className="text-[#9b87f5]">Call: (732) 638 0513</p>
            </div>
            
            <div className="bg-[#3a2a5a] p-3 rounded-md">
              <p className="font-medium text-white">Real Estate Agency</p>
              <p className="text-gray-300">Township Real Estate</p>
              <p className="text-[#9b87f5]">Call: (732) 702 8348</p>
            </div>
            
            <div className="bg-[#3a2a5a] p-3 rounded-md">
              <p className="font-medium text-white">Restaurant</p>
              <p className="text-gray-300">The Slice House</p>
              <p className="text-[#9b87f5]">Call: (657) 464 2712</p>
            </div>
            
            <div className="bg-[#3a2a5a] p-3 rounded-md">
              <p className="font-medium text-white">Retail Services</p>
              <p className="text-gray-300">Flagship Barbers</p>
              <p className="text-[#9b87f5]">Call: (978) 818 8357</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

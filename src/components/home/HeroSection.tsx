
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection = ({ initialLoad }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden px-6 lg:px-8 pt-36 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 
            className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 transition-all duration-1000 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
          >
            Why should those Silicon Valley <span className="font-extrabold text-purple-400">nerds</span> have all the fancy AI toys?
          </h1>
          
          <p 
            className={`mt-4 text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-tight font-bold transition-all duration-1000 delay-300 ease-out transform
              ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
          >
            We're the world's first <Link to="/ai-agency" className="border-b-2 border-purple-400 hover:text-purple-400 transition-colors">AI agency</Link> delivering custom AI agent solutions to SMBs. Just like a web design firm, we build you bespoke AI agents quickly and cost effectively.
          </p>
          
          <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <Link to="/blog/understanding-ai-agents">
              <Button className="text-white bg-[#6E59A5] hover:bg-[#6E59A5]/80 px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                What's an AI agent?
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-accent-dark text-white px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                Book a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button className="bg-white hover:bg-gray-100 text-accent px-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              Talk to an AI Agent Now
              <Phone className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


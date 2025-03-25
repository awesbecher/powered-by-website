
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HeroSectionProps {
  initialLoad: boolean;
}

export const HeroSection = ({ initialLoad }: HeroSectionProps) => {
  const [videoOpen, setVideoOpen] = React.useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className={`transition-all duration-1000 ease-out transform ${initialLoad ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-[#9b87f5] block mb-2 text-5xl sm:text-6xl lg:text-7xl">Now Launching:</span>
            Custom AI Agents for <span className="text-white">SMBs</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Deploy agentic AI solutions for voice, email, SMS, and more. No coding required.
            Built for SMBs who need enterprise-grade AI solutions at affordable prices.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="https://www.producthunt.com/posts/powered_by" target="_blank" rel="noreferrer">
              <Button
                className="bg-[#4A2A82] hover:bg-[#3D2269] text-white px-6 py-6 text-lg rounded-md w-full sm:w-auto flex items-center"
              >
                <img src="/lovable-uploads/a5f716f2-7362-4352-8931-2d27b2892c7e.png" alt="Product Hunt" className="w-6 h-6 mr-2" />
                View on Product Hunt
              </Button>
            </a>
            <Button
              onClick={() => setVideoOpen(true)}
              className="bg-black hover:bg-gray-900 text-white px-6 py-6 text-lg rounded-md w-full sm:w-auto flex items-center"
            >
              Watch Launch! <Tv className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/contact">
              <Button
                className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-6 text-lg rounded-md w-full sm:w-auto"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* YouTube Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/EGR10-TIQS8?si=yuQhOAFH9sqLNJRy&autoplay=1" 
              title="Launch Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

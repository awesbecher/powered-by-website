
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv } from "lucide-react";
import { Link } from "react-router-dom";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className={`w-full space-y-4 transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
        Meet Your New <span className="text-[#9b87f5]">AI Text Agent</span>: Texting reinvented!
      </h1>
      <p className="text-lg text-gray-300">
        Automate your SMS text messages, turning every text into an opportunity to connect, convert, and delight. Whether you're chasing leads, supporting customers, or boosting sales, our AI Text Agent works tirelessly to make your messaging effortless and effective.
      </p>
      <p className="text-lg text-gray-300">
        With an AI Text Agent by <PoweredByText />, you get intelligent SMS communication that handles follow-ups, inquiries, and customer interactions—all autonomously while meeting your company policies and privacy requirements.
      </p>
      <div className="space-y-3 text-gray-300">
        <p className="text-lg">Our AI Text Agent adapts to your business needs:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>Automates SMS marketing & lead gen campaigns</li>
          <li>Writes human-like texts using advanced NLP, ensuring every message feels on-brand</li>
          <li>Schedules, sends, and follows up on texts automatically based on triggers</li>
          <li>Stays TCPA and GDPR-friendly with opt-in/out handling and secure data management</li>
        </ul>
      </div>
      
      {/* New video button section */}
      <div className="flex flex-col items-start mt-4">
        <p className="text-gray-300 font-bold mb-1 text-left">See for yourself:</p>
        <div className="flex flex-wrap gap-3 self-start">
          <Button 
            className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center"
            onClick={() => setVideoOpen(true)}
          >
            <Tv className="mr-2 h-5 w-5" /> Watch our intro to AI SMS-Text Agents
          </Button>
        </div>
      </div>

      {/* YouTube Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/placeholder?autoplay=1" 
              title="AI SMS-Text Agents Introduction" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

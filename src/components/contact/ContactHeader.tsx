
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { WebhookErrorDisplay } from "./WebhookErrorDisplay";

interface ContactHeaderProps {
  initialLoad: boolean;
}

export const ContactHeader = ({ initialLoad }: ContactHeaderProps) => {
  return (
    <div 
      className={`transition-all duration-1000 ease-out
        ${initialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <h1 className="text-5xl font-bold text-white text-center mb-6">
        Book a <span className="text-[#9b87f5]">Free</span> Consultation Meeting
      </h1>
      <p className="text-xl text-center text-gray-300 mb-8">
        Ready to put AI agents to work? Want to find a good use case? Book a Free Consultation with the <span className="bg-white/10 text-[#9b87f5] px-3 py-1 rounded">Powered_by</span> Solutions Design Team to learn more!
      </p>
    </div>
  );
};

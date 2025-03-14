
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
      <div className="flex items-center mb-2">
        <CalendarIcon className="h-7 w-7 text-accent mr-2" />
        <h1 className="text-3xl font-bold text-white">Schedule a Meeting</h1>
      </div>
      <p className="text-gray-300 mb-2">
        Book a time to speak with our team about how we can help your business grow with AI voice and text agents.
      </p>
      <p className="text-gray-400 text-sm mb-6">
        Select a time from the calendar below and fill in your information. We'll send you a confirmation email with the meeting details.
      </p>
    </div>
  );
};

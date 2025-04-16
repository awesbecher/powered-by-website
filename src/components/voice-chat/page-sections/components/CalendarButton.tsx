
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface CalendarButtonProps {
  onClick?: () => void;
  className?: string;
}

export const CalendarButton = ({ onClick, className = "" }: CalendarButtonProps) => {
  return (
    <Button
      data-cal-namespace="get-started-with-voice-ai-chat"
      data-cal-link="team-powered-by-dfbtbb/get-started-with-voice-ai-chat"
      data-cal-config='{"layout":"month_view"}'
      onClick={(e) => {
        console.log("Calendar button clicked in CalendarButton component");
        if (onClick) onClick();
      }}
      className={`bg-[#6342ff] hover:bg-[#5233e0] text-white px-6 py-4 text-base rounded-md flex items-center ${className}`}
    >
      <Calendar className="mr-2 h-5 w-5" />
      Get Started
    </Button>
  );
};

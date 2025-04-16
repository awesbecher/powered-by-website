
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
      onClick={onClick}
      className={`bg-[#6342ff] hover:bg-[#5233e0] text-white px-8 py-6 text-lg rounded-md flex items-center shadow-lg shadow-[#6342ff]/20 ${className}`}
    >
      <Calendar className="mr-2 h-5 w-5" />
      Schedule a Demo
    </Button>
  );
};

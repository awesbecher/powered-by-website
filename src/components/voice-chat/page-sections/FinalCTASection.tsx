
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { PoweredByText } from "@/components/shared/PoweredByText";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface FinalCTASectionProps {
  handleContact: () => void;
}

export const FinalCTASection = ({ handleContact }: FinalCTASectionProps) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"get-started-with-voice-ai-chat"});
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand":"#292929"},
          "dark": {"cal-brand":"#fafafa"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        Transform Your Customer Experience Today
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Join the businesses revolutionizing customer interactions with AI voice technology.
      </p>
      <Button 
        data-cal-namespace="get-started-with-voice-ai-chat"
        data-cal-link="team-powered-by-dfbtbb/get-started-with-voice-ai-chat"
        data-cal-config='{"layout":"month_view"}'
        className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-8 py-6 text-lg rounded-md mx-auto flex items-center"
      >
        Get Started Now <Calendar className="ml-2 h-5 w-5" />
      </Button>
    </section>
  );
};

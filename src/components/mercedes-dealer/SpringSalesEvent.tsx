import { useEffect } from "react";
import { Phone, Calendar } from "lucide-react";
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getCalApi } from "@calcom/embed-react";

interface SpringSalesEventProps {
  isProcessing: boolean;
  isCallActive: boolean;
  setShowOffers: (value: boolean) => void;
  setShowCallDialog: (value: boolean) => void;
}

const SpringSalesEvent = ({ 
  isProcessing, 
  isCallActive,
  setShowCallDialog
}: SpringSalesEventProps) => {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        if (cal) {
          cal("ui", {
            "cssVarsPerTheme": {
              "light": {"cal-brand":"#292929"},
              "dark": {"cal-brand":"#fafafa"}
            },
            "hideEventTypeDetails": false,
            "layout": "month_view"
          });
          
          // Preload the calendar link
          cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
        }
      } catch (error) {
        console.error("Error initializing Cal.com embed:", error);
      }
    })();
  }, []);

  const handleCalendarClick = () => {
    // First try direct method
    try {
      (window as any).Cal?.('ui', {
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      (window as any).Cal?.('showModal', {
        calLink: "team-powered-by-dfbtbb/get-started-today",
        config: {
          layout: 'month_view',
        },
      });
      console.log("Called Cal.com showModal directly");
      return;
    } catch (err) {
      console.error("Failed to open Cal.com modal directly:", err);
    }
    
    // Try to find and click the Cal button
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM");
    }
  };

  return (
    <div id="speak-with-us" className="rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm p-8 mb-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-white">Spring Sales Event</h2>
        <p className="text-xl mb-4 text-white">Exceptional Offers on New 2025 Models</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            className="bg-[#9b87f5] text-white px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2"
            onClick={() => setShowCallDialog(true)}
            disabled={isProcessing || isCallActive}
          >
            Speak with us now!
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={handleCalendarClick}
            className="bg-black text-white px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2"
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"month_view"}'
          >
            Book Your Free Voice Agent Demo
            <Calendar className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpringSalesEvent;

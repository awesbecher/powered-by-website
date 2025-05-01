import { LucideIcon } from "lucide-react";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface ServiceBoxProps {
  icon: LucideIcon;
  category: string;
  name: string;
  description: string;
}

export const ServiceBox = ({ 
  icon: Icon, 
  category, 
  name,
  description
}: ServiceBoxProps) => {
  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            light: {"cal-brand": "#8B5CF6"},
            dark: {"cal-brand": "#8B5CF6"}
          },
          hideEventTypeDetails: false,
          layout: "column_view"
        });
      } catch (error) {
        console.error("Error initializing Cal.com in ServiceBox:", error);
      }
    })();
  }, []);

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative backdrop-blur-sm bg-gray-900/80 p-6 rounded-xl border border-purple-500/20 shadow-xl h-full flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Icon className="text-[#9b87f5] text-xl" />
            <h3 className="font-sans text-lg font-bold text-white leading-tight tracking-wide">
              {category}
            </h3>
          </div>
          <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="font-sans text-sm font-semibold text-[#9b87f5] mb-1">{name}</div>
          <div className="text-white text-sm mb-4">{description}</div>
          
          <button
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"column_view","theme":"dark"}'
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 py-2 rounded-lg 
              font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  );
};

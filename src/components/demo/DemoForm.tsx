
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface DemoFormProps {
  onFormSubmitted: () => void;
}

export const DemoForm = ({ onFormSubmitted }: DemoFormProps) => {
  // Initialize Cal.com embed
  useEffect(() => {
    (async function () {
      try {
        console.log("Initializing Cal.com embed in DemoForm");
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully in DemoForm");
      } catch (error) {
        console.error("Error initializing Cal.com embed in DemoForm:", error);
      }
    })();
  }, []);
  
  return (
    <>
      <p className="mt-4 text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto font-bold">
        Experience our AI agents right now by viewing our on-demand demos. See how our agent solutions apply to a series of industry-specific use cases. Please fill out the form below to access our demos:
      </p>
      
      <div className="mt-8 max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
        <TallyFormEmbed 
          formId="mVNb9y" 
          height={500}
          transparentBackground={true}
          alignLeft={true}
          onSubmit={onFormSubmitted}
        />
      </div>
      
      {/* Hidden Cal.com button that will be triggered if needed */}
      <button
        data-cal-namespace="get-started-today"
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
      ></button>
    </>
  );
};

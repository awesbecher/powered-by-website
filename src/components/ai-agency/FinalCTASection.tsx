
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

export const FinalCTASection = () => {
  useEffect(() => {
    // Initialize Cal.com with consistent namespace and team link
    (async function () {
      try {
        console.log("Initializing Cal.com embed in AI Agency FinalCTASection");
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        
        // Use direct method to ensure it works
        cal("preload", { calLink: "team-powered-by-dfbtbb/get-started-today" });
        
        console.log("Cal.com embed initialized successfully in AI Agency FinalCTASection");
      } catch (error) {
        console.error("Error initializing Cal.com embed in AI Agency FinalCTASection:", error);
      }
    })();
  }, []);

  const handleClick = async () => {
    console.log("Get Started button clicked in AI Agency FinalCTASection");
    
    try {
      // Get fresh instance of Cal API with the correct namespace
      const cal = await getCalApi({"namespace":"get-started-today"});
      
      // Configure UI
      cal("ui", {
        "cssVarsPerTheme": {
          "light": {"cal-brand":"#292929"},
          "dark": {"cal-brand":"#fafafa"}
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
      
      // Use the correct method name: "modal" instead of "showModal"
      cal("modal", { calLink: "team-powered-by-dfbtbb/get-started-today" });
      
      console.log("Called Cal.com modal directly from AI Agency");
    } catch (error) {
      console.error("Failed to open Cal.com modal from AI Agency:", error);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        Ready to transform your SMB with AI agents?
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Join the businesses revolutionizing the way they work, communicate, & engage customers.
      </p>
      <Button 
        className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-md"
        onClick={handleClick}
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
      >
        Get Started <Calendar className="ml-2 h-5 w-5" />
      </Button>

      {/* No need for hidden button with direct Cal API approach */}
    </section>
  );
};

export default FinalCTASection;

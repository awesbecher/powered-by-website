
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import MainContent from "@/components/home/MainContent";
import { getCalApi } from "@calcom/embed-react";

const Index = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setInitialLoad(false);
    
    // Initialize Cal.com with consistent namespace and team link
    (async function () {
      try {
        console.log("Initializing Cal.com embed at Index page level");
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully at Index page level");
      } catch (error) {
        console.error("Error initializing Cal.com embed at Index page level:", error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>
      
      <MainContent />
      
      <Footer />

      {/* Hidden Cal.com button that will be triggered programmatically */}
      <button
        data-cal-namespace="get-started-today"
        data-cal-link="team-powered-by-dfbtbb/get-started-today"
        data-cal-config='{"layout":"month_view"}'
        className="hidden"
      ></button>
    </div>
  );
};

export default Index;

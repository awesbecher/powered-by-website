
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Cal, { getCalApi } from "@calcom/embed-react";

const Contact = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set initialLoad to false after a short delay to trigger animations
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top when component mounts to ensure content is fully visible
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
      } catch (error) {
        console.error("Error initializing Cal.com:", error);
        toast({
          title: "Calendar loading error",
          description: "Failed to load scheduling calendar. Please try again later.",
          variant: "destructive"
        });
      }
    })();
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      {/* Content section */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-10 pt-8 px-4 pb-12">
        <div className="w-full max-w-5xl mx-auto">
          {/* Header section */}
          <div className="mb-4"> {/* Reduced from mb-10 to mb-4 */}
            <ContactHeader initialLoad={initialLoad} />
          </div>
          
          {/* Calendar section */}
          <div className="w-full h-[800px]">
            <Cal 
              namespace="get-started-today"
              calLink="team-powered-by-dfbtbb/get-started-today"
              style={{width:"100%", height:"100%", overflow:"scroll"}}
              config={{"layout":"month_view"}}
            />
          </div>
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      
      <Footer />
    </div>
  );
};

export default Contact;


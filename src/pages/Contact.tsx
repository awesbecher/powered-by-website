
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

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
    // Initialize Cal.com for popup
    (async function () {
      const cal = await getCalApi({"namespace":"get-started-today"});
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      {/* Content section */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-10 pt-8 px-4 pb-12">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header section */}
          <div className="mb-10">
            <ContactHeader initialLoad={initialLoad} />
          </div>
          
          {/* Schedule button */}
          <div className="flex flex-col items-center justify-center">
            <Button 
              data-cal-namespace="get-started-today"
              data-cal-link="team-powered-by-dfbtbb/get-started-today"
              data-cal-config='{"layout":"month_view"}'
              className="bg-[#6342ff] hover:bg-[#5233e0] text-white px-8 py-6 text-xl rounded-md flex items-center gap-2 transform transition-all duration-200 hover:scale-105"
              size="lg"
            >
              <Calendar className="h-6 w-6" />
              Schedule Now
            </Button>
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

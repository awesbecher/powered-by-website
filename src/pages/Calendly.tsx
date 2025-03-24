
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CalendlyWidget } from "@/components/contact/CalendlyWidget";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { POWERED_BY_STYLE } from "@/components/voice-chat/hooks/types/contactFormTypes";

const Calendly = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Set initialLoad to false after a short delay to trigger animations
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      <div className="flex-grow flex flex-col relative z-10 pt-6 px-4">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-accent mb-6 transition-all duration-700 ease-out 
                         text-center
                         tracking-tight">
            Meet with Us!
          </h1>
          
          <div className="mb-6 text-center">
            <p className="text-gray-300 max-w-2xl mx-auto">
              Please use the calendar below to schedule a Free 30-min Consultation Meeting with Powered_by Design Team. We'll help you learn more about AI agents and pinpoint specific areas within your business they could be deployed.
            </p>
          </div>
          
          {/* Calendly embed */}
          <CalendlyWidget initialLoad={initialLoad} />
          
          {/* Terms disclosure */}
          <div className="text-center mt-4 mb-6">
            <p className="text-xs text-gray-400">
              By using <span className={POWERED_BY_STYLE}>Powered_by</span> you agree to our{" "}
              <Link to="/terms-of-service" className="text-purple-400 hover:text-purple-300 transition-colors">
                Terms of Service
              </Link>
              ,{" "}
              <Link to="/privacy-statement" className="text-purple-400 hover:text-purple-300 transition-colors">
                Privacy
              </Link>
              , and Security policies and practices.
            </p>
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

export default Calendly;

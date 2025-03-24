
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CalendlyWidget } from "@/components/contact/CalendlyWidget";
import { useEffect, useState } from "react";

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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-700 ease-out 
                         text-center
                         tracking-tight">
            Schedule a Call
          </h1>
          
          <div className="mb-6 text-center">
            <p className="text-gray-300 max-w-2xl mx-auto">
              Use the calendar below to schedule a consultation with our team. We'll discuss how Powered_by can help your business implement effective AI solutions.
            </p>
          </div>
          
          {/* Calendly embed */}
          <CalendlyWidget initialLoad={initialLoad} />
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
